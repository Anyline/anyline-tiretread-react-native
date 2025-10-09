package com.anyline.ttr.reactnative

import android.Manifest
import android.content.Intent
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import io.anyline.tiretread.sdk.AnylineTireTreadSdk
import io.anyline.tiretread.sdk.Response
import io.anyline.tiretread.sdk.getTreadDepthReportResult
import io.anyline.tiretread.sdk.init
import io.anyline.tiretread.sdk.types.TreadDepthResult
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

    @ReactMethod
    fun isAndroidDeviceSupported(promise: Promise) {
        val currentActivity = currentActivity ?: run {
            promise.reject("NO_ACTIVITY", "Activity doesn't exist")
            return
        }

        try {
            // Check for camera permission first
            if (currentActivity.checkSelfPermission(Manifest.permission.CAMERA) !=
                PackageManager.PERMISSION_GRANTED) {
                throw SecurityException("Camera permission must be granted before calling this method")
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
