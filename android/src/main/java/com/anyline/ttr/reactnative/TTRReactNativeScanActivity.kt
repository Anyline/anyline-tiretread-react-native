package com.anyline.ttr.reactnative

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import io.anyline.tiretread.sdk.config.TireTreadConfig
import io.anyline.tiretread.sdk.scanner.AnylineInternalFeature
import io.anyline.tiretread.sdk.scanner.ScanEvent
import io.anyline.tiretread.sdk.scanner.TireTreadScanView
import kotlinx.serialization.json.Json

class TTRReactNativeScanActivity : AppCompatActivity() {

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
        tireTreadScanViewCallback = null,
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

    uuid?.let { TTRReactNativeCallbackManager.getCallback()?.onResultSuccess(it) }

    finish()
  }

  private fun onUploadFailed(uuid: String?, exception: Exception) {

    TTRReactNativeCallbackManager.getCallback()?.onResultError("UPLOAD_FAILED", exception.message ?: "Upload failed")

    finish()
  }

}
