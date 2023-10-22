package com.snoozelabs.scanner;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.content.res.Resources;
import android.graphics.Bitmap;
import android.graphics.PixelFormat;
import android.hardware.display.DisplayManager;
import android.hardware.display.VirtualDisplay;
import android.media.Image;
import android.media.ImageReader;
import android.media.projection.MediaProjection;
import android.media.projection.MediaProjectionManager;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import android.view.Display;
import android.view.OrientationEventListener;
import android.view.WindowManager;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.ByteBuffer;

public class ScannerServiceCamera {
    private ScannerService scannerService;
    private String storeDir;
    private MediaProjection mediaProjection;
    private ImageReader imageReader;
    private Handler handler;
    private Display display;
    private VirtualDisplay virtualDisplay;
    private int density, width, height, rotation;
    private OrientationChangeCallback orientationChangeCallback;

    public ScannerServiceCamera(ScannerService scannerService) {
        this.scannerService = scannerService;
    }

    /**
     * Initializes the camera module.
     */
    public void initialize() {
        // create storage directory
        File externalFilesDir = scannerService.getExternalFilesDir(null);
        if (externalFilesDir != null) {
            storeDir = externalFilesDir.getAbsolutePath() + "/screenshots";
            File storeDirectory = new File(storeDir);
            if (!storeDirectory.exists()) {
                boolean success = storeDirectory.mkdirs();
                if (!success) {
                    Log.e(Constants.TAG, "Failed to create file storage directory.");
                    scannerService.stopSelf();
                }
            }
        } else {
            Log.e(Constants.TAG, "Failed to create file storage directory, getExternalFilesDir is null.");
            scannerService.stopSelf();
        }

        // start capture handling thread
        new Thread() {
            @Override
            public void run() {
                Looper.prepare();
                handler = new Handler();
                Looper.loop();
            }
        }.start();
    }

    /**
     * Starts projecting the screen onto a virtual display.
     */
    public void startProjection(int resultCode, Intent data) {
        MediaProjectionManager mpManager =
                (MediaProjectionManager) scannerService.getSystemService(Context.MEDIA_PROJECTION_SERVICE);

        if (mediaProjection == null) {
            mediaProjection = mpManager.getMediaProjection(resultCode, data);

            if (mediaProjection != null) {
                // display metrics
                density = Resources.getSystem().getDisplayMetrics().densityDpi;
                WindowManager windowManager = (WindowManager) scannerService.getSystemService(Context.WINDOW_SERVICE);
                display = windowManager.getDefaultDisplay();

                // create virtual display depending on device width / height
                createVirtualDisplay();

                // register orientation change callback
                orientationChangeCallback = new OrientationChangeCallback(scannerService);
                if (orientationChangeCallback.canDetectOrientation()) {
                    orientationChangeCallback.enable();
                }

                // register media projection stop callback
                mediaProjection.registerCallback(new MediaProjectionStopCallback(), handler);
            }
        }
    }

    /**
     * Stops the current projection.
     */
    public void stopProjection() {
        if (handler != null) {
            handler.post(() -> {
                if (mediaProjection != null) {
                    mediaProjection.stop();
                }
            });
        }
    }

    @SuppressLint("WrongConstant")
    private void createVirtualDisplay() {
        // get width and height
        width = Resources.getSystem().getDisplayMetrics().widthPixels;
        height = Resources.getSystem().getDisplayMetrics().heightPixels;

        // start capture reader
        imageReader = ImageReader.newInstance(width, height, PixelFormat.RGBA_8888, 1);
        virtualDisplay = mediaProjection.createVirtualDisplay("pokemon_sleep_scanner", width, height,
                density, DisplayManager.VIRTUAL_DISPLAY_FLAG_OWN_CONTENT_ONLY | DisplayManager.VIRTUAL_DISPLAY_FLAG_PUBLIC, imageReader.getSurface(), null, handler);
    }


    /**
     * Takes a snapshot of the current screen and saves it to disk.
     */
    public void scan(OnScanCompleteListener listener) {
        String filePath = "";
        try (Image image = imageReader.acquireLatestImage()) {
            if (image != null) {
                FileOutputStream fos = null;
                Bitmap bitmap = null;

                Image.Plane[] planes = image.getPlanes();
                ByteBuffer buffer = planes[0].getBuffer();
                int pixelStride = planes[0].getPixelStride();
                int rowStride = planes[0].getRowStride();
                int rowPadding = rowStride - pixelStride * width;

                try {
                    // create bitmap
                    bitmap = Bitmap.createBitmap(width + rowPadding / pixelStride, height, Bitmap.Config.ARGB_8888);
                    bitmap.copyPixelsFromBuffer(buffer);

                    // write bitmap to a file
                    filePath = storeDir + "/latest_scan.png";
                    fos = new FileOutputStream(filePath);
                    bitmap.compress(Bitmap.CompressFormat.PNG, 100, fos);

                } catch (FileNotFoundException e) {
                    throw new RuntimeException(e);
                } finally {
                    if (fos != null) {
                        try {
                            fos.close();
                        } catch (IOException ioe) {
                            ioe.printStackTrace();
                        }
                    }

                    if (bitmap != null) {
                        bitmap.recycle();
                    }

                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        listener.onScanComplete(filePath);
    }


    private class OrientationChangeCallback extends OrientationEventListener {

        OrientationChangeCallback(Context context) {
            super(context);
        }

        @Override
        public void onOrientationChanged(int orientation) {
            final int newRotation = display.getRotation();
            if (rotation != newRotation) {
                rotation = newRotation;
                try {
                    // clean up
                    if (virtualDisplay != null) virtualDisplay.release();

                    // re-create virtual display depending on device width / height
                    createVirtualDisplay();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
    }

    private class MediaProjectionStopCallback extends MediaProjection.Callback {
        @Override
        public void onStop() {
            handler.post(() -> {
                if (virtualDisplay != null) virtualDisplay.release();
                if (orientationChangeCallback != null) orientationChangeCallback.disable();
                mediaProjection.unregisterCallback(MediaProjectionStopCallback.this);
            });
        }
    }
}

interface OnScanCompleteListener {
    void onScanComplete(String filePath);
}