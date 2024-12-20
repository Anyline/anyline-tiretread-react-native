package com.anyline.ttr.reactnative

import android.os.Bundle
import android.view.KeyEvent
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.compose.ui.platform.ViewCompositionStrategy
import io.anyline.tiretread.sdk.scanner.AnylineInternalFeature
import io.anyline.tiretread.sdk.scanner.DistanceStatus
import io.anyline.tiretread.sdk.scanner.TireTreadScanView
import io.anyline.tiretread.sdk.scanner.TireTreadScanViewCallback
import io.anyline.tiretread.sdk.scanner.TireTreadScanViewConfig
import io.anyline.tiretread.sdk.scanner.TireTreadScanner
import kotlinx.serialization.json.Json

class TTRReactNativeScanActivity : AppCompatActivity(), TireTreadScanViewCallback {

  @OptIn(AnylineInternalFeature::class)
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

    var ttrView = TireTreadScanView(this)

    var configJson = intent.getStringExtra("config")
    var tireWidthInt = intent.getIntExtra("tireWidth", 0)

    val config = configJson?.let { Json.decodeFromString<TireTreadScanViewConfig>(it) }

    if (config == null) {
      TTRReactNativeCallbackManager.getCallback()?.onResultError("CONFIG_ABORT", "The Json could not be parsed successful")

      finish()
      return
    }

    // Configure the TireTreadScanView
    ttrView.apply {
      if (tireWidthInt != 0) {
        init(config, tireWidthInt, this@TTRReactNativeScanActivity)
      } else {
        init(config, null, this@TTRReactNativeScanActivity)
      }
      setViewCompositionStrategy(
        ViewCompositionStrategy.DisposeOnLifecycleDestroyed(
          this@TTRReactNativeScanActivity
        )
      )
    }
    setContentView(ttrView)
  }

  override fun onScanAbort(uuid: String?) {
    super.onScanAbort(uuid)

    TTRReactNativeCallbackManager.getCallback()?.onResultError("SCAN_ABORT", "Scan aborted")

    finish()
  }

  override fun onUploadCompleted(uuid: String?) {
    super.onUploadCompleted(uuid)

    uuid?.let { TTRReactNativeCallbackManager.getCallback()?.onResultSuccess(it) }

    finish()
  }

  override fun onUploadFailed(uuid: String?, exception: Exception) {
    super.onUploadFailed(uuid, exception)

    TTRReactNativeCallbackManager.getCallback()?.onResultError("UPLOAD_FAILED", exception.message ?: "Upload failed")

    finish()
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
