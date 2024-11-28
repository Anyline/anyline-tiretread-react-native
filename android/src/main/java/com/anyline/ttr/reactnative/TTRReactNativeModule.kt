package com.anyline.ttr.reactnative

import android.content.Intent
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import io.anyline.tiretread.sdk.AnylineTireTreadSdk
import io.anyline.tiretread.sdk.Response
import io.anyline.tiretread.sdk.SdkInitializeFailedException
import io.anyline.tiretread.sdk.SdkLicenseKeyInvalidException
import io.anyline.tiretread.sdk.getTreadDepthReportResult
import io.anyline.tiretread.sdk.init
import io.anyline.tiretread.sdk.types.TreadDepthResult
import io.anyline.tiretread.sdk.types.toJson


class TTRReactNativeModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return NAME
  }

  @ReactMethod
  fun initTireTread(licenseKey: String, promise: Promise) {
    Thread {
      try {
        val activity = currentActivity
        if (activity != null) {
          AnylineTireTreadSdk.init(licenseKey, activity)
          activity.runOnUiThread {
            promise.resolve("Initialization successful")
          }
        } else {
          promise.reject("E_ACTIVITY_DOES_NOT_EXIST", "Activity does not exist")
        }
      } catch (e: SdkLicenseKeyInvalidException) {
        promise.reject("E_LICENSE_KEY_INVALID", e.localizedMessage)
      } catch (e: SdkInitializeFailedException) {
        promise.reject("E_INITIALIZATION_FAILED", e.localizedMessage)
      }
    }.start()
  }

  @ReactMethod
  fun startTireTreadScanActivity(config: String, promise: Promise) {
    val currentActivity = currentActivity
    if (currentActivity != null) {

      TTRReactNativeCallbackManager.registerCallback(object : TTRReactNativeResultCallback {
        override fun onResultSuccess(uuid: String) {
          TTRReactNativeCallbackManager.unregisterCallback(this)
          promise.resolve(uuid)
        }

        override fun onResultError(errorCode: String, errorMessage: String) {
          TTRReactNativeCallbackManager.unregisterCallback(this)
          promise.reject(errorCode, errorMessage)
        }
      })

      val intent = Intent(currentActivity, TTRReactNativeScanActivity::class.java)
      intent.putExtra("config", config)
      currentActivity.startActivity(intent)
    }
  }

  @ReactMethod
  fun getTreadDepthReportResult(measurementUuid: String, promise: Promise) {
    Thread {
      AnylineTireTreadSdk.getTreadDepthReportResult(measurementUuid, onResponse = { response: Response<TreadDepthResult> ->

        when(response){
          is Response.Success -> {
            currentActivity?.runOnUiThread { promise.resolve(response.data.toJson()) }
          }
          is Response.Error -> {
            promise.reject(
              response.errorCode ?: "UNKNOWN_ERROR",
              response.errorMessage ?: "Unknown error occurred"
            )
          }
          is Response.Exception -> {
            promise.reject(
              "EXCEPTION",
              response.exception.message ?: "An exception occurred"
            )
          }
        }
      })
    }.start()
  }

  companion object {
    const val NAME = "AnylineTtrMobileWrapperReactNative"
  }
}
