package com.anyline.ttr.reactnative

interface TTRReactNativeResultCallback {
  fun onResultSuccess(uuid: String)
  fun onResultError(errorCode: String, errorMessage: String)
}

object TTRReactNativeCallbackManager {
  private var callback: TTRReactNativeResultCallback? = null

  fun registerCallback(cb: TTRReactNativeResultCallback) {
    callback = cb
  }

  fun unregisterCallback(cb: TTRReactNativeResultCallback) {
    if (callback == cb) callback = null
  }

  fun getCallback(): TTRReactNativeResultCallback? = callback
}
