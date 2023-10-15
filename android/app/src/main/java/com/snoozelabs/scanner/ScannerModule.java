package com.snoozelabs.scanner;

import android.content.Intent;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class ScannerModule extends ReactContextBaseJavaModule {

    ScannerModule(ReactApplicationContext reactContext) {
        super(reactContext);
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
            Intent launchPokemonSleepIntent = activity.getPackageManager().getLaunchIntentForPackage("jp.pokemon.pokemonsleep");
            if (launchPokemonSleepIntent != null) {
                activity.startActivity(launchPokemonSleepIntent);
            }
            activity.startScannerService();
        }
        promise.resolve(true);
    }
}
