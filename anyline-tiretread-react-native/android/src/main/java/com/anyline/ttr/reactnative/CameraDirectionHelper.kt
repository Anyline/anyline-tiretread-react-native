package com.anyline.ttr.reactnative

import android.app.Activity
import android.content.Context
import android.os.Build
import android.view.Surface

object CameraDirectionHelper {

    enum class CameraDirection {
        LEFT, RIGHT, UNKNOWN
    }

    /**
     * Get current camera direction based on device orientation
     * Returns: LEFT when camera points left, RIGHT when camera points right
     */
    fun getCameraDirection(context: Context): CameraDirection {
        val rotation = if (Build.VERSION.SDK_INT >= 30) {
            context.display?.rotation
        } else {
            @Suppress("DEPRECATION")
            (context as? Activity)?.windowManager?.defaultDisplay?.rotation
        } ?: return CameraDirection.UNKNOWN

        return when (rotation) {
            Surface.ROTATION_90 -> CameraDirection.LEFT    // Camera points left
            Surface.ROTATION_270 -> CameraDirection.RIGHT  // Camera points right
            else -> CameraDirection.UNKNOWN                // Portrait or unknown
        }
    }
}