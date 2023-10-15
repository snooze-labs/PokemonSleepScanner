package com.snoozelabs.scanner;

import android.annotation.TargetApi;
import android.content.Context;
import android.graphics.Point;
import android.os.Build;
import android.util.AttributeSet;
import android.view.WindowManager;
import android.widget.FrameLayout;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

public class FullscreenOverlayLayout extends FrameLayout {

    public FullscreenOverlayLayout(@NonNull Context context) {
        super(context);
    }

    public FullscreenOverlayLayout(@NonNull Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
    }

    public FullscreenOverlayLayout(@NonNull Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
    }

    public FullscreenOverlayLayout(@NonNull Context context, @Nullable AttributeSet attrs, int defStyleAttr, int defStyleRes) {
        super(context, attrs, defStyleAttr, defStyleRes);
    }

    @TargetApi(Build.VERSION_CODES.JELLY_BEAN_MR1)
    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        WindowManager windowManager = (WindowManager) getContext().getSystemService(Context.WINDOW_SERVICE);
        Point screenSize = new Point();
        windowManager.getDefaultDisplay().getRealSize(screenSize);

        super.onMeasure(
                MeasureSpec.makeMeasureSpec(screenSize.x, MeasureSpec.getMode(widthMeasureSpec)),
                MeasureSpec.makeMeasureSpec(screenSize.y, MeasureSpec.getMode(heightMeasureSpec))
        );
    }
}
