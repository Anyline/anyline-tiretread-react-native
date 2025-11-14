package com.anyline.ttr.reactnative

import android.Manifest
import android.content.Intent
import android.os.Build
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.facebook.react.bridge.ReactMethod
import io.anyline.tiretread.sdk.AnylineTireTreadSdk
import io.anyline.tiretread.sdk.Response
import io.anyline.tiretread.sdk.getTreadDepthReportResult
import io.anyline.tiretread.sdk.getHeatmap
import io.anyline.tiretread.sdk.init
import io.anyline.tiretread.sdk.types.TreadDepthResult
import io.anyline.tiretread.sdk.types.Heatmap
import io.anyline.tiretread.sdk.types.toJson
import android.content.Context
import android.content.pm.PackageManager
import android.graphics.SurfaceTexture
import android.hardware.camera2.CameraAccessException
import android.hardware.camera2.CameraCaptureSession
import android.hardware.camera2.CameraManager
import android.hardware.camera2.CameraCharacteristics
import android.hardware.camera2.CameraDevice
import android.hardware.camera2.CaptureFailure
import android.hardware.camera2.CaptureRequest
import android.hardware.camera2.CaptureResult
import android.hardware.camera2.TotalCaptureResult
import android.util.Log
import android.view.Surface
import io.anyline.tiretread.sdk.NoConnectionException
import io.anyline.tiretread.sdk.SdkLicenseKeyForbiddenException
import io.anyline.tiretread.sdk.SdkLicenseKeyInvalidException

class TTRReactNativeModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  init {
    moduleInstance = this
  }

  override fun getName(): String {
    return NAME
  }
    private lateinit var surfaceTexture: SurfaceTexture
    private lateinit var cameraManager: CameraManager
    private lateinit var cameraDevice: CameraDevice
    private lateinit var captureSession: CameraCaptureSession
    private lateinit var captureRequestBuilder: CaptureRequest.Builder
    private var captureCount = 0
    private val maxCaptures = 70
    private var isFocusDistanceSupported = false

    private val supportedDevicePatterns = listOf(
        "23021RAA2Y",
        "220233L2G",
        "ELE-L29",
        "A6003",  // OnePlus 6
        "GM19.*", // OnePlus 7*
        "HD19.*", // OnePlus 7*
        "IN20.*", // OnePlus 8*
        "LE21.*", // OnePlus 9*
        "NE22.*", // OnePlus 10*
        "OnePlus.*",
        "ONEPLUS.*",
        "Pixel.*",
        "POT-LX1",
        "Redmi Note 8 Pro",
        "M2003J15SC", // Redmi Note 9
        "SM-A14.*",
        "SM-A155.*",
        "SM-A20.*",
        "SM-A226B",
        "SM-A32.*",
        "SM-A33.*",
        "SM-A405FN",
        "SM-A5\\d[5-9].*", // Samsung A50 and newer (no A5)
        "SM-G398FN", // Samsung xcover 4s
        "SM-G525F",
        "SM-G736.*", // Samsung xcover 6 pro
        "SM-G98.*", // Samsung S20*
        "SM-G99.*", // Samsung S21*
        "SM-S9.*", // Samsung S22/3/4/5
        "SM-M135F",
        "SM-S711B",
        "SM-T575", // Samsung Tab Active 3
        "SM-T630", // Samsung Tab Active 4
        "SM-X306B", // Samsung Tab Active 5
        "EM45",
        "TC26",
        "TC27",
        "TC58",
        "TC78",
    )

    private fun isDeviceInAllowlist(): Boolean {
        return try {
            val deviceModel = Build.MODEL ?: return false
            supportedDevicePatterns.any { pattern ->
                try {
                    deviceModel.matches(Regex(pattern))
                } catch (e: Exception) {
                    false
                }
            }
        } catch (e: Exception) {
            false
        }
    }

    @ReactMethod
    fun isAndroidDeviceSupported(promise: Promise) {
        val currentActivity = reactApplicationContext.currentActivity ?: run {
            promise.reject("NO_ACTIVITY", "Activity doesn't exist")
            return
        }

        try {
            // Check for camera permission first
            if (currentActivity.checkSelfPermission(Manifest.permission.CAMERA) !=
                PackageManager.PERMISSION_GRANTED) {
                throw SecurityException("Camera permission must be granted before calling this method")
            }

            // After permission check, see if we can bypass the camera check
            try {
                if (isDeviceInAllowlist()) {
                    promise.resolve(true)
                    return
                }
            } catch (e: Exception) {
                // Silently fail allowlist check and continue with camera check
            }

            cameraManager = currentActivity.getSystemService(Context.CAMERA_SERVICE) as CameraManager
            val cameraId = cameraManager.cameraIdList.find { id ->
                val characteristics = cameraManager.getCameraCharacteristics(id)
                val lensFacing = characteristics[CameraCharacteristics.LENS_FACING]
                lensFacing == CameraCharacteristics.LENS_FACING_BACK
            } ?: run {
                promise.reject("NO_CAMERA", "No back camera found")
                return
            }

            startCameraOperation(cameraId, promise)
        } catch (e: SecurityException) {
            promise.reject("PERMISSION_REQUIRED", "Camera permission is required", e)
        } catch (e: CameraAccessException) {
            promise.reject("CAMERA_ERROR", e.message, e)
        }
    }

    private fun startCameraOperation(cameraId: String, promise: Promise) {
        this.isFocusDistanceSupported = false
        this.captureCount = 0

        try {
            cameraManager.openCamera(cameraId, object : CameraDevice.StateCallback() {
                override fun onOpened(camera: CameraDevice) {
                    cameraDevice = camera
                    createCaptureSession(promise)
                }

                override fun onDisconnected(camera: CameraDevice) {
                    camera.close()
                    promise.reject("CAMERA_ERROR", "Camera disconnected")
                }

                override fun onError(camera: CameraDevice, error: Int) {
                    camera.close()
                    promise.reject("CAMERA_ERROR", "Camera error: $error" )
                }
            }, null)
        } catch (e: SecurityException) {
            promise.reject("PERMISSION_REQUIRED", "Camera permission is required", e)
        } catch (e: CameraAccessException) {
            promise.reject("CAMERA_ERROR", e.message, e)
        }
    }

    private fun createCaptureSession(promise: Promise) {
        try {
            surfaceTexture = SurfaceTexture(10)
            val surface = Surface(surfaceTexture)
            captureRequestBuilder = cameraDevice.createCaptureRequest(CameraDevice.TEMPLATE_PREVIEW)
            captureRequestBuilder.addTarget(surface)

            // Set auto-focus mode
            captureRequestBuilder[CaptureRequest.CONTROL_AF_MODE] =
                CaptureRequest.CONTROL_AF_MODE_AUTO

            // Trigger autofocus to wake up lazy focus systems
            captureRequestBuilder[CaptureRequest.CONTROL_AF_TRIGGER] =
                CaptureRequest.CONTROL_AF_TRIGGER_START

            cameraDevice.createCaptureSession(
                listOf(surface),
                object : CameraCaptureSession.StateCallback() {
                    override fun onConfigured(session: CameraCaptureSession) {
                        captureSession = session
                        try {
                            captureSession.setRepeatingRequest(
                                captureRequestBuilder.build(),
                                createCaptureCallback(promise),
                                null
                            )
                        } catch (e: Exception) {
                            promise.reject("CAMERA_ERROR", "Failed to start capture session")
                        }
                    }

                    override fun onConfigureFailed(session: CameraCaptureSession) {
                        promise.reject("CAMERA_ERROR", "Failed to configure capture session")
                    }
                },
                null
            )
        } catch (e: CameraAccessException) {
            promise.reject("CAMERA_ERROR", e.message)
        }
    }

    private fun createCaptureCallback(promise: Promise): CameraCaptureSession.CaptureCallback {
        return object : CameraCaptureSession.CaptureCallback() {
            override fun onCaptureCompleted(
                session: CameraCaptureSession,
                request: CaptureRequest,
                result: TotalCaptureResult
            ) {
                try {
                    val focusDistance = result[CaptureResult.LENS_FOCUS_DISTANCE]
                    // Accept any non-zero focus distance (positive or negative)
                    // Some devices (e.g. Samsung A14) report negative values due to different optical implementations
                    if (focusDistance != null && focusDistance != 0.0f) {
                        isFocusDistanceSupported = true
                    }
                    captureCount++

                    // Escalating autofocus triggers for lazy devices
                    if (!isFocusDistanceSupported) {
                        when (captureCount) {
                            5 -> triggerAutofocus(session)
                            20 -> triggerAutofocus(session)
                            50 -> triggerAutofocus(session)
                        }
                    }

                    // Check if we should stop capturing
                    if (isFocusDistanceSupported || captureCount >= maxCaptures) {
                        try {
                            captureSession.stopRepeating()
                            captureSession.abortCaptures()
                            cameraDevice.close()
                            promise.resolve(isFocusDistanceSupported)
                        } catch (e: Exception) {
                            promise.resolve(isFocusDistanceSupported)
                        }
                    }
                } catch (e: Exception) {
                    try {
                        captureSession.stopRepeating()
                        captureSession.abortCaptures()
                        cameraDevice.close()
                    } catch (closeError: Exception) {
                        // Silently handle camera close errors
                    }
                    promise.reject("CAMERA_ERROR", "Error in Camera capture callback")
                }
            }

            override fun onCaptureFailed(
                session: CameraCaptureSession,
                request: CaptureRequest,
                failure: CaptureFailure
            ) {
                try {
                    session.stopRepeating()
                    session.abortCaptures()
                    cameraDevice.close()
                } catch (e: Exception) {
                }
                promise.reject("CAMERA_ERROR", "Camera capture failed")
            }
        }
    }

    private fun triggerAutofocus(session: CameraCaptureSession) {
        try {
            val triggerBuilder = cameraDevice.createCaptureRequest(CameraDevice.TEMPLATE_PREVIEW)
            triggerBuilder.addTarget(Surface(surfaceTexture))
            triggerBuilder[CaptureRequest.CONTROL_AF_MODE] = CaptureRequest.CONTROL_AF_MODE_AUTO
            triggerBuilder[CaptureRequest.CONTROL_AF_TRIGGER] = CaptureRequest.CONTROL_AF_TRIGGER_START
            session.capture(triggerBuilder.build(), null, null)
        } catch (e: Exception) {
            // Silently handle autofocus trigger failures
        }
    }

  @ReactMethod
  fun initTireTread(licenseKey: String, promise: Promise) {
    Thread {
      try {
        val activity = reactApplicationContext.currentActivity
        if (activity != null) {
          AnylineTireTreadSdk.init(licenseKey, activity)
          activity.runOnUiThread {
            promise.resolve("Initialization successful")
          }
        } else {
          promise.reject("E_ACTIVITY_DOES_NOT_EXIST", "Activity does not exist")
        }
      } catch (e: SdkLicenseKeyInvalidException) {
        promise.reject("E_LICENSE_KEY_INVALID", e.message)
      } catch (e: Exception) {
        promise.reject("E_INITIALIZATION_FAILED", e.message)
      } catch (e: SdkLicenseKeyForbiddenException) {
          promise.reject("E_LICENSE_KEY_INVALID", e.message)
      } catch (e: NoConnectionException) {
          promise.reject("E_INITIALIZATION_FAILED", e.message)
      }
    }.start()
  }

  @ReactMethod
  fun startTireTreadScanActivity(config: String, tireWidth: Integer, promise: Promise) {
    val currentActivity = reactApplicationContext.currentActivity
    if (currentActivity != null) {

      TTRReactNativeCallbackManager.registerCallback(object : TTRReactNativeResultCallback {
        override fun onResultSuccess(uuid: String, cameraDirection: String?) {
          TTRReactNativeCallbackManager.unregisterCallback(this)
          val result = Arguments.createMap().apply {
            putString("uuid", uuid)
            putString("cameraDirection", cameraDirection)
          }
          promise.resolve(result)
        }

        override fun onResultError(errorCode: String, errorMessage: String) {
          TTRReactNativeCallbackManager.unregisterCallback(this)
          promise.reject(errorCode, errorMessage)
        }
      })

      val intent = Intent(currentActivity, TTRReactNativeScanActivity::class.java)
      intent.putExtra("config", config)
      intent.putExtra("tireWidth", tireWidth)
      currentActivity.startActivity(intent)
    }
  }

  @ReactMethod
  fun getTreadDepthReportResult(measurementUuid: String, promise: Promise) {
    Thread {
      AnylineTireTreadSdk.getTreadDepthReportResult(measurementUuid, onResponse = { response: Response<TreadDepthResult> ->

        when(response){
          is Response.Success -> {
            reactApplicationContext.currentActivity?.runOnUiThread { promise.resolve(response.data.toJson()) }
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

  @ReactMethod
  fun getHeatMap(measurementUuid: String, promise: Promise) {
    Thread {
      AnylineTireTreadSdk.getHeatmap(measurementUuid, timeoutSeconds = 30, onResponse = { response: Response<Heatmap> ->

        when(response){
          is Response.Success -> {
            reactApplicationContext.currentActivity?.runOnUiThread { promise.resolve(response.data.url) }
          }
          is Response.Error -> {
            val message = response.errorMessage ?: "Unknown error"
            promise.reject(
              response.errorCode ?: "UNKNOWN_ERROR",
              message
            )
          }
          is Response.Exception -> {
            val exceptionMessage = "Unable to get heatmap result: " + (response.exception.message ?: "Unknown exception")
            promise.reject(
              "EXCEPTION",
              exceptionMessage
            )
          }
        }
      })
    }.start()
  }

  // Helper method to send events to JavaScript
  fun sendEvent(eventName: String, params: com.facebook.react.bridge.WritableMap?) {
    reactApplicationContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      .emit(eventName, params)
  }

  // Required for NativeEventEmitter - these are no-op implementations
  // but React Native requires them to be present to avoid runtime warnings
  @ReactMethod
  fun addListener(eventName: String) {
    // Keep: Required for RN NativeEventEmitter
  }

  @ReactMethod
  fun removeListeners(count: Integer) {
    // Keep: Required for RN NativeEventEmitter
  }

  companion object {
    const val NAME = "AnylineTtrMobileWrapperReactNative"

    // Static reference for event sending from activities
    var moduleInstance: TTRReactNativeModule? = null
  }
}
