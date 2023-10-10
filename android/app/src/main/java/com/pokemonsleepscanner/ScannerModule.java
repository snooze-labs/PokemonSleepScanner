package com.pokemonsleepscanner;

import android.util.Log;

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
        void startOverlay() {
            ReactApplicationContext context = getReactApplicationContext();
            Log.println(Log.ERROR, "POKEMONESLEEP", "@@@@@@@@@@@@@@@@");

//            Intent intent = new Intent(context, ExampleActivity.class);
//            context.startActivity(intent);
        }
    }
