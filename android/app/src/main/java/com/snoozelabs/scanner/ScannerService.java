package com.snoozelabs.scanner;

import android.animation.Animator;
import android.animation.AnimatorListenerAdapter;
import android.app.Activity;
import android.app.Notification;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.content.res.Configuration;
import android.content.res.Resources;
import android.graphics.PixelFormat;
import android.graphics.Point;
import android.os.Binder;
import android.os.Build;
import android.os.Handler;
import android.os.IBinder;
import android.os.Looper;
import android.util.Log;
import android.view.Gravity;
import android.view.HapticFeedbackConstants;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.WindowManager;
import android.widget.ImageView;

import androidx.core.util.Pair;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.modules.core.DeviceEventManagerModule;

/**
 * Service for the floating scanner widget.
 */
public class ScannerService extends Service {

    private IBinder binder = new LocalBinder();
    private IScannerServiceCallbacks scannerServiceCallbacks;
    private static final String INTENT_EXTRA_RESULT_CODE = "RESULT_CODE";
    private static final String INTENT_EXTRA_DATA = "DATA";
    private static final int MAX_TIME_FOR_CLICK_IN_MS = 300;

    private WindowManager windowManager;
    private View floatingWidgetView;
    private View draggingOverlayView;
    private ImageView removeZoneImageView;
    private View removeZoneView;
    private Point windowSize = new Point();

    private int initialCoordinateX, initialCoordinateY, initialMarginX, initialMarginY;

    private final ScannerServiceCamera camera = new ScannerServiceCamera(this);


    /**
     * Returns intent to start the service.
     */
    public static Intent getStartIntent(Context context, int resultCode, Intent data) {
        Intent intent = new Intent(context, ScannerService.class);
        intent.putExtra(INTENT_EXTRA_RESULT_CODE, resultCode);
        intent.putExtra(INTENT_EXTRA_DATA, data);
        return intent;
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        Pair<Integer, Notification> notification = ScannerServiceNotifications.getNotification(this);
        startForeground(notification.first, notification.second);

        int resultCode = intent.getIntExtra(INTENT_EXTRA_RESULT_CODE, Activity.RESULT_CANCELED);
        Intent data = intent.getParcelableExtra(INTENT_EXTRA_DATA);

        camera.startProjection(resultCode, data);
        return START_NOT_STICKY;
    }

    public class LocalBinder extends Binder {
        ScannerService getService() {
            return ScannerService.this;
        }
    }

    @Override
    public IBinder onBind(Intent intent) {
        return binder;
    }

    public void setCallbacks(IScannerServiceCallbacks callbacks) {
        scannerServiceCallbacks = callbacks;
    }

    @Override
    public void onCreate() {
        super.onCreate();

        // initialize screen dimensions
        windowManager = (WindowManager) getSystemService(WINDOW_SERVICE);
        windowSize = getWindowManagerDefaultDisplay();

        // create the layouts
        LayoutInflater inflater = (LayoutInflater) getSystemService(LAYOUT_INFLATER_SERVICE);
        addDraggingOverlayView(inflater);
        addRemoveZoneView(inflater);
        addFloatingWidgetView(inflater);

        // add listeners
        implementTouchListenerForFloatingWidget();

        // initialize the camera
        camera.initialize();
    }

    /**
     * Layout flag to use for overlay.
     */
    private int getLayoutFlag() {
        return (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) ?
                WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY :
                WindowManager.LayoutParams.TYPE_PHONE;
    }

    /*  Add Remove View to Window Manager  */
    private View addDraggingOverlayView(LayoutInflater inflater) {
        // Inflate the removing view layout we created
        draggingOverlayView = inflater.inflate(R.layout.overlay_service, null);

        // Add the view to the window.
        WindowManager.LayoutParams params = new WindowManager.LayoutParams(
                WindowManager.LayoutParams.WRAP_CONTENT,
                WindowManager.LayoutParams.WRAP_CONTENT,
                this.getLayoutFlag(),
                WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE |
                        WindowManager.LayoutParams.FLAG_FULLSCREEN |
                        WindowManager.LayoutParams.FLAG_LAYOUT_IN_SCREEN |
                        WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS |
                        WindowManager.LayoutParams.FLAG_LAYOUT_INSET_DECOR |
                        WindowManager.LayoutParams.FLAG_NOT_TOUCH_MODAL,
                PixelFormat.TRANSLUCENT);

        params.gravity = Gravity.LEFT | Gravity.TOP;

        // Initially the view is not visible, so set visibility to GONE
        draggingOverlayView.setVisibility(View.GONE);

        // Add the view to the window
        windowManager.addView(draggingOverlayView, params);
        return draggingOverlayView;
    }


    /*  Add Remove View to Window Manager  */
    private View addRemoveZoneView(LayoutInflater inflater) {
        // Inflate the removing view layout we created
        removeZoneView = inflater.inflate(R.layout.remove_floating_widget_layout, null);

        // Add the view to the window.
        WindowManager.LayoutParams params = new WindowManager.LayoutParams(
                WindowManager.LayoutParams.WRAP_CONTENT,
                WindowManager.LayoutParams.WRAP_CONTENT,
                this.getLayoutFlag(),
                WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE | WindowManager.LayoutParams.FLAG_WATCH_OUTSIDE_TOUCH | WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS,
                PixelFormat.TRANSLUCENT);

        // Specify the view position
        params.gravity = Gravity.BOTTOM | Gravity.CENTER;
        params.x = -5;
        params.y = -5;

        // Initially the Removing widget view is not visible, so set visibility to GONE
        removeZoneView.setVisibility(View.GONE);
        removeZoneImageView = removeZoneView.findViewById(R.id.remove_img);

        // Add the view to the window
        windowManager.addView(removeZoneView, params);
        return removeZoneImageView;
    }

    /*  Add Floating Widget View to Window Manager  */
    private void addFloatingWidgetView(LayoutInflater inflater) {
        // Inflate the floating view layout we created
        floatingWidgetView = inflater.inflate(R.layout.scanner_widget_layout, null);

        // Add the view to the window.
        final WindowManager.LayoutParams params = new WindowManager.LayoutParams(
                WindowManager.LayoutParams.WRAP_CONTENT,
                WindowManager.LayoutParams.WRAP_CONTENT,
                this.getLayoutFlag(),
                WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE,
                PixelFormat.TRANSLUCENT);

        // Specify the view position
        params.gravity = Gravity.TOP | Gravity.LEFT;
        params.x = 0;
        params.y = 100;

        // Add the view to the window
        windowManager.addView(floatingWidgetView, params);
    }

    private Point getWindowManagerDefaultDisplay() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.HONEYCOMB_MR2) {
            Point point = new Point();
            windowManager.getDefaultDisplay().getSize(point);
            return point;
        }

        int width = Resources.getSystem().getDisplayMetrics().widthPixels;
        int height = Resources.getSystem().getDisplayMetrics().heightPixels;
        return new Point(width, height);
    }

    /*  Touch listener for the draggable view  */
    private void implementTouchListenerForFloatingWidget() {
        // Drag and move floating view using user's touch action.
        floatingWidgetView.findViewById(R.id.root_container).setOnTouchListener(new View.OnTouchListener() {
            long timeStart = 0;
            boolean inRemoveZone = false;

            @Override
            public boolean onTouch(View v, MotionEvent event) {
                // Get floating widget view params
                WindowManager.LayoutParams layoutParams = (WindowManager.LayoutParams) floatingWidgetView.getLayoutParams();

                // Get the touch location coordinates
                int coordinateX = (int) event.getRawX();
                int coordinateY = (int) event.getRawY();

                int destinationCoordinateX, destinationCoordinateY;

                switch (event.getAction()) {
                    case MotionEvent.ACTION_DOWN:
                        timeStart = System.currentTimeMillis();

                        initialCoordinateX = coordinateX;
                        initialCoordinateY = coordinateY;

                        // Remember the initial margins (make sure we constrain to valid screen coordinates as well)
                        initialMarginX = Math.max(Math.min(layoutParams.x, windowSize.x), 0);
                        initialMarginY = Math.max(Math.min(layoutParams.y, windowSize.y), 0);
                        return true;

                    case MotionEvent.ACTION_UP:
                        // Animate the disappearance of the remove zone and overlay
                        draggingOverlayView.animate().alpha(0f).setDuration(getResources().getInteger(android.R.integer.config_shortAnimTime))
                                .setListener(new AnimatorListenerAdapter() {
                                    @Override
                                    public void onAnimationEnd(Animator animation) {
                                        draggingOverlayView.setVisibility(View.GONE);
                                    }
                                });
                        removeZoneView.animate().y(5000).setDuration(getResources().getInteger(android.R.integer.config_shortAnimTime))
                                .setListener(new AnimatorListenerAdapter() {
                                    @Override
                                    public void onAnimationEnd(Animator animation) {
                                        removeZoneView.setVisibility(View.GONE);
                                    }
                                });

                        // If user drag and drop the floating widget view into the remove view then stop the service
                        if (inRemoveZone) {
                            floatingWidgetView.performHapticFeedback(HapticFeedbackConstants.CONFIRM);
                            stopSelf();
                            return true;
                        }

                        // Get the difference between initial coordinate and current coordinate
                        int diffX = coordinateX - initialCoordinateX;
                        int diffY = coordinateY - initialCoordinateY;

                        // The check for x_diff < 5 && y_diff < 5 because sometimes elements move a little while clicking.
                        if (Math.abs(diffX) < 5 && Math.abs(diffY) < 5) {
                            // Don't consider it to be a click unless we fall within the total allowed time
                            if ((System.currentTimeMillis() - timeStart) < MAX_TIME_FOR_CLICK_IN_MS) {
                                onFloatingWidgetClick();
                            }
                        }
                        return true;

                    case MotionEvent.ACTION_MOVE:
                        // Set remove widget view visibility to VISIBLE
                        if (removeZoneView.getVisibility() != View.VISIBLE && System.currentTimeMillis() - timeStart > MAX_TIME_FOR_CLICK_IN_MS) {
                            removeZoneView.setY(5000);
                            removeZoneView.setVisibility(View.VISIBLE);
                            removeZoneView.animate()
                                    .y(0)
                                    .setDuration(getResources().getInteger(android.R.integer.config_shortAnimTime))
                                    .setListener(null);
                            draggingOverlayView.setAlpha(0f);
                            draggingOverlayView.setVisibility(View.VISIBLE);
                            draggingOverlayView.animate()
                                    .alpha(1f)
                                    .setDuration(getResources().getInteger(android.R.integer.config_shortAnimTime))
                                    .setListener(null);
                        }

                        int x_diff_move = coordinateX - initialCoordinateX;
                        int y_diff_move = coordinateY - initialCoordinateY;

                        destinationCoordinateX = initialMarginX + x_diff_move;
                        destinationCoordinateY = initialMarginY + y_diff_move;

                        // Space in which the camera widget should be teleported to the remove zone
                        int x_bound_left = windowSize.x / 2 - windowSize.x / 5;
                        int x_bound_right = windowSize.x / 2 + windowSize.x / 5;
                        int y_bound_top = windowSize.y - windowSize.y / 10;

                        // If floating view is dropped into the remove zone then handle the remove
                        if ((coordinateX >= x_bound_left && coordinateX <= x_bound_right) && coordinateY >= y_bound_top) {
                            if (!inRemoveZone) {
                                floatingWidgetView.performHapticFeedback(HapticFeedbackConstants.CONTEXT_CLICK);
                                floatingWidgetView.animate()
                                        .scaleX(0.8f)
                                        .scaleY(0.8f)
                                        .setDuration(getResources().getInteger(android.R.integer.config_shortAnimTime))
                                        .setListener(null);
                                inRemoveZone = true;
                            }

                            // The following is padding to align the camera widget onto the remove zone
                            layoutParams.x = -5;
                            layoutParams.y = 20;
                            layoutParams.gravity = Gravity.BOTTOM | Gravity.CENTER;
                            windowManager.updateViewLayout(floatingWidgetView, layoutParams);
                            return true;
                        } else {
                            // If floating view gets out of the remove zone view update the remove zone view again
                            if (inRemoveZone) {
                                inRemoveZone = false;
                                floatingWidgetView.animate()
                                        .scaleX(1f)
                                        .scaleY(1f)
                                        .setDuration(getResources().getInteger(android.R.integer.config_shortAnimTime))
                                        .setListener(null);
                            }
                        }

                        layoutParams.gravity = Gravity.LEFT | Gravity.TOP;
                        layoutParams.x = destinationCoordinateX;
                        layoutParams.y = destinationCoordinateY;

                        // Update the layout with new X & Y coordinate
                        windowManager.updateViewLayout(floatingWidgetView, layoutParams);
                        return true;
                }
                return false;
            }
        });
    }

    /* Reset the x coordinate when screen configuration changes. */
    private void resetPosition(int currentCoordinateX) {
        WindowManager.LayoutParams params = (WindowManager.LayoutParams) floatingWidgetView.getLayoutParams();
        if (currentCoordinateX <= windowSize.x / 2) {
            params.x = 0;
        } else {
            params.x = windowSize.x;
        }
        windowManager.updateViewLayout(floatingWidgetView, params);
    }

    /*  return status bar height on basis of device display metrics  */
    private int getStatusBarHeight() {
        return (int) Math.ceil(25 * getApplicationContext().getResources().getDisplayMetrics().density);
    }


    /*  Update floating widget view coordinates on configuration change  */
    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        getWindowManagerDefaultDisplay();
        WindowManager.LayoutParams layoutParams = (WindowManager.LayoutParams) floatingWidgetView.getLayoutParams();
        if (newConfig.orientation == Configuration.ORIENTATION_LANDSCAPE) {
            if (layoutParams.y + (floatingWidgetView.getHeight() + getStatusBarHeight()) > windowSize.y) {
                layoutParams.y = windowSize.y - (floatingWidgetView.getHeight() + getStatusBarHeight());
                windowManager.updateViewLayout(floatingWidgetView, layoutParams);
            }
            if (layoutParams.x != 0 && layoutParams.x < windowSize.x) {
                resetPosition(windowSize.x);
            }
        } else if (newConfig.orientation == Configuration.ORIENTATION_PORTRAIT) {
            if (layoutParams.x > windowSize.x) {
                resetPosition(windowSize.x);
            }
        }
    }

    // Handle screenshot
    private void onFloatingWidgetClick() {
        // hide the button, snapshot then show it again after
        floatingWidgetView.setVisibility(View.GONE);
        final Handler handler = new Handler();
        handler.postDelayed(() -> camera.scan((filePath) -> {
            if (scannerServiceCallbacks != null) {
                scannerServiceCallbacks.onScanComplete(filePath);
            }
            new Handler(Looper.getMainLooper()).post(() -> {
                floatingWidgetView.setVisibility(View.VISIBLE);
            });
        }), 200);
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        /*  on destroy remove both view from window manager */
        if (floatingWidgetView != null) {
            windowManager.removeView(floatingWidgetView);
        }
        if (removeZoneView != null) {
            windowManager.removeView(removeZoneView);
        }

        // dispose the camera projection
        camera.stopProjection();
    }
}