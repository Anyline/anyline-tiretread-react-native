package com.anyline.ttr.reactnative

interface TTRReactNativeResultCallback {
  fun onResultSuccess(uuid: String)
  fun onResultError(errorCode: String, errorMessage: String)
}

object TTRReactNativeCallbackManager {
  private var callback: TTRReactNativeResultCallback? = null
  private var lastCameraDirection: String? = null

  fun registerCallback(cb: TTRReactNativeResultCallback) {
    callback = cb
  }

  fun unregisterCallback(cb: TTRReactNativeResultCallback) {
    if (callback == cb) {
      callback = null
      lastCameraDirection = null
    }
  }

  fun getCallback(): TTRReactNativeResultCallback? = callback

  fun setCameraDirection(direction: String) {
    lastCameraDirection = direction
  }

  fun getCameraDirection(): String? = lastCameraDirection
}
