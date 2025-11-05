package com.anyline.ttr.reactnative

import android.os.Bundle
import android.view.KeyEvent
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import io.anyline.tiretread.sdk.config.TireTreadConfig
import io.anyline.tiretread.sdk.scanner.AnylineInternalFeature
import io.anyline.tiretread.sdk.scanner.DistanceStatus
import io.anyline.tiretread.sdk.scanner.OnDistanceChanged
import io.anyline.tiretread.sdk.scanner.OnImageUploaded
import io.anyline.tiretread.sdk.scanner.OnScanStarted
import io.anyline.tiretread.sdk.scanner.OnScanStopped
import io.anyline.tiretread.sdk.scanner.ScanEvent
import io.anyline.tiretread.sdk.scanner.TireTreadScanView
import io.anyline.tiretread.sdk.scanner.TireTreadScanner
import kotlinx.serialization.json.Json

class TTRReactNativeScanActivity : AppCompatActivity() {

  private var scanCameraDirection: CameraDirectionHelper.CameraDirection = CameraDirectionHelper.CameraDirection.UNKNOWN
  private var currentMeasurementUUID: String? = null

  @OptIn(AnylineInternalFeature::class)
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

    var ttrView = TireTreadScanView(this)

    var configJsonString = intent.getStringExtra("config")
    var tireWidthInt = intent.getIntExtra("tireWidth", 0)

    val config = configJsonString?.let { Json.decodeFromString<TireTreadConfig>(it) }

    if (config == null) {
      TTRReactNativeCallbackManager.getCallback()?.onResultError("CONFIG_ABORT", "The Json could not be parsed successful")

      finish()
      return
    }

    if (tireWidthInt != 0) {
      config.scanConfig.tireWidth = tireWidthInt
    }

    // Configure the TireTreadScanView
    ttrView.apply {
      init(
        tireTreadConfig = config,
        onScanAborted = { uuid: String? ->
          onScanAborted(uuid)
        },
        onScanProcessCompleted = { uuid: String ->
          onScanProcessCompleted(uuid)
        },
        tireTreadScanViewCallback = ::handleScanEvent,
        onError = { uuid: String?, exception: Exception ->
          onUploadFailed(uuid, exception)
        }
      )
    }
    setContentView(ttrView)
  }

  private fun onScanAborted(uuid: String?) {
    TTRReactNativeCallbackManager.getCallback()?.onResultError("SCAN_ABORT", "Scan aborted")

    finish()
  }

  private fun onScanProcessCompleted(uuid: String?)  {

    uuid?.let {
      // Store camera direction for retrieval if needed
      TTRReactNativeCallbackManager.setCameraDirection(scanCameraDirection.name)
      // Pass camera direction to callback
      TTRReactNativeCallbackManager.getCallback()?.onResultSuccess(it, scanCameraDirection.name)
    }

    finish()
  }

  private fun onUploadFailed(uuid: String?, exception: Exception) {

    TTRReactNativeCallbackManager.getCallback()?.onResultError("UPLOAD_FAILED", exception.message ?: "Upload failed")

    finish()
  }

  private fun handleScanEvent(event: ScanEvent) {
    when (event) {
      is OnScanStarted -> {
        currentMeasurementUUID = event.measurementUUID
        scanCameraDirection = CameraDirectionHelper.getCameraDirection(this)

        val params = Arguments.createMap().apply {
          putString("type", "scanStarted")
          putString("measurementUUID", event.measurementUUID)
          putString("cameraDirection", scanCameraDirection.name)
        }
        sendEvent("TireTreadScanEvent", params)
      }
      is OnScanStopped -> {
        val params = Arguments.createMap().apply {
          putString("type", "scanStopped")
          putString("measurementUUID", currentMeasurementUUID)
        }
        sendEvent("TireTreadScanEvent", params)
      }
      is OnImageUploaded -> {
        val params = Arguments.createMap().apply {
          putString("type", "imageUploaded")
          putString("measurementUUID", currentMeasurementUUID)
          putInt("uploaded", event.uploaded)
          putInt("total", event.total)
        }
        sendEvent("TireTreadScanEvent", params)
      }
      is OnDistanceChanged -> {
        val params = Arguments.createMap().apply {
          putString("type", "distanceChanged")
          putString("measurementUUID", currentMeasurementUUID)
          putString("distanceStatus", event.newStatus.name)
        }
        sendEvent("TireTreadScanEvent", params)
      }
      else -> {
        // Handle other events if needed
      }
    }
  }

  private fun sendEvent(eventName: String, params: WritableMap) {
    try {
      TTRReactNativeModule.moduleInstance?.sendEvent(eventName, params)
    } catch (e: Exception) {
      // Silent fail if module is not available
    }
  }

  override fun dispatchKeyEvent(event: KeyEvent): Boolean {
    return when (event.keyCode) {
      KeyEvent.KEYCODE_VOLUME_UP, KeyEvent.KEYCODE_VOLUME_DOWN -> {
        if (event.action == KeyEvent.ACTION_UP) return true

        if (TireTreadScanner.instance.isScanning) {
          TireTreadScanner.instance.stopScanning()
        } else {
          if (TireTreadScanner.instance.captureDistanceStatus == DistanceStatus.OK)
            TireTreadScanner.instance.startScanning()
          else {
            Toast.makeText(
              this,
              "Move the phone to the correct position before starting.",
              Toast.LENGTH_SHORT
            ).show()
          }
        }
        true
      }

      else -> super.dispatchKeyEvent(event)
    }
  }
}
