package com.snoozelabs.scanner;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import javax.annotation.Nullable;

public class ScannerModule extends ReactContextBaseJavaModule {

    private DeviceEventManagerModule.RCTDeviceEventEmitter emitter = null;

    ScannerModule(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(new ActivityEventListener() {
            @Override
            public void onActivityResult(Activity activity, int i, int i1, @androidx.annotation.Nullable Intent intent) {

            }

            @Override
            public void onNewIntent(Intent intent) {

            }
        });
    }

    @Override
    public String getName() {
        return "Scanner";
    }

    @ReactMethod
    void startOverlay(Promise promise) {
        MainActivity activity = (MainActivity) getCurrentActivity();
        if (activity != null) {
            // Spawn the Pokemon Sleep app and the overlay bubble at the same time
            activity.startScannerService(this);
        }
        promise.resolve(true);
    }

    public void sendEvent(String eventName,  @Nullable WritableMap params) {
        if (emitter == null) {
            emitter = getReactApplicationContext().getJSModule((DeviceEventManagerModule.RCTDeviceEventEmitter.class));
        }
        if (emitter != null) {
            WritableMap transitParams = Arguments.createMap();
            transitParams.putString("type", eventName);
            transitParams.putMap("payload", params);
            emitter.emit("POKEMON_SLEEP_SCANNER_NATIVE_EVENT", transitParams);
        }
    }
}
