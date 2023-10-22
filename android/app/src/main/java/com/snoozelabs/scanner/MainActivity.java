package com.snoozelabs.scanner;

import android.app.Activity;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.media.projection.MediaProjectionManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.IBinder;
import android.provider.Settings;

import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;

public class MainActivity extends ReactActivity implements IScannerServiceCallbacks {
    private ScannerService scannerService;
    private ScannerModule scannerModule;
    private boolean isScannerServiceBound = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(null);
    }

    /**
     * Returns the name of the main component registered from JavaScript. This is used to schedule
     * rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "PokemonSleepScanner";
    }

    /**
     * Returns the instance of the {@link ReactActivityDelegate}. Here we use a util class {@link
     * DefaultReactActivityDelegate} which allows you to easily enable Fabric and Concurrent React
     * (aka React 18) with two boolean flags.
     */
    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        DefaultReactActivityDelegate defaultReactActivityDelegate = new DefaultReactActivityDelegate(
                this,
                getMainComponentName(),
                // If you opted-in for the New Architecture, we enable the Fabric Renderer.
                DefaultNewArchitectureEntryPoint.getFabricEnabled());
        return defaultReactActivityDelegate;
    }

    /**
     * Starts the scanner service.
     */
    public void startScannerService(ScannerModule scannerModuleRef) {
        scannerModule = scannerModuleRef;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            if (!Settings.canDrawOverlays(this)) {
                Intent intent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
                        Uri.parse("package:" + getPackageName()));
                overlayPermissionLauncher.launch(intent);
                return;
            }
        }
        // if we already have permission then just directly launch the service
        this.launchScannerService();
    }

    private void launchScannerService() {
        MediaProjectionManager projectionManager = (MediaProjectionManager) getSystemService(Context.MEDIA_PROJECTION_SERVICE);
        scannerServiceLauncher.launch(projectionManager.createScreenCaptureIntent());
    }

    /**
     * Handles the launch of the service (after permissions have been requested).
     */
    ActivityResultLauncher<Intent> overlayPermissionLauncher = registerForActivityResult(
            new ActivityResultContracts.StartActivityForResult(),
            result -> {
                int resultCode = result.getResultCode();
                if (resultCode == Activity.RESULT_OK) {
                    this.launchScannerService();
                }
            });

    private ServiceConnection serviceConnection = new ServiceConnection() {
        @Override
        public void onServiceConnected(ComponentName name, IBinder service) {
            ScannerService.LocalBinder binder = (ScannerService.LocalBinder) service;
            scannerService = binder.getService();
            isScannerServiceBound = true;
            scannerService.setCallbacks(MainActivity.this);
        }

        @Override
        public void onServiceDisconnected(ComponentName name) {
            isScannerServiceBound = false;
        }
    };

    /**
     * Handles the launch of the service (after permissions have been requested).
     */
    ActivityResultLauncher<Intent> scannerServiceLauncher = registerForActivityResult(
            new ActivityResultContracts.StartActivityForResult(),
            result -> {
                int resultCode = result.getResultCode();
                if (resultCode == Activity.RESULT_OK) {
                    Intent data = result.getData();
                    Intent scannerIntent = ScannerService.getStartIntent(getApplicationContext(), resultCode, data);
                    startService(scannerIntent);
                    bindService(scannerIntent, serviceConnection, Context.BIND_AUTO_CREATE);

                    Intent launchPokemonSleepIntent = getPackageManager().getLaunchIntentForPackage("jp.pokemon.pokemonsleep");
                    if (launchPokemonSleepIntent != null) {
                        launchPokemonSleepIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                        startActivity(launchPokemonSleepIntent);
                    }
                }
            });

    private void unbindService() {
        if (isScannerServiceBound) {
            scannerService.setCallbacks(null);
            scannerService.stopService();
            unbindService(serviceConnection);
            isScannerServiceBound = false;
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        unbindService();
    }

    @Override
    public void onScanComplete(String filePath) {
        WritableMap params = Arguments.createMap();
        params.putString("filePath", filePath);
        scannerModule.sendEvent(Events.SCAN_COMPLETED, params);
    }

    @Override
    public void onDisposeService() {
        unbindService();
        Intent i = new Intent(this, MainActivity.class);
        i.setAction(Intent.ACTION_MAIN);
        i.addCategory(Intent.CATEGORY_LAUNCHER);
        startActivity(i);
    }
}
