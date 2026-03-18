package com.anyline.ttr.reactnative

import android.content.Context
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.ReadableType
import io.anyline.tiretread.sdk.InternalAPI
import io.anyline.tiretread.sdk.AnylineTireTreadSdk
import io.anyline.tiretread.sdk.api.AnylineTireTread
import io.anyline.tiretread.sdk.api.AnylineTireTreadScanner
import io.anyline.tiretread.sdk.api.Bridge
import io.anyline.tiretread.sdk.api.ErrorCode
import io.anyline.tiretread.sdk.api.FailedOutcome
import io.anyline.tiretread.sdk.api.InitOptions
import io.anyline.tiretread.sdk.api.ScanOutcome
import io.anyline.tiretread.sdk.api.SdkError
import io.anyline.tiretread.sdk.api.SdkResult
import io.anyline.tiretread.sdk.types.Heatmap
import io.anyline.tiretread.sdk.types.MeasurementInfo
import io.anyline.tiretread.sdk.types.TreadDepthResult
import io.anyline.tiretread.sdk.types.TreadResultRegion
import io.anyline.tiretread.sdk.types.WrapperInfo
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonNull
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.buildJsonArray
import kotlinx.serialization.json.buildJsonObject

internal class TTRReactNativeModuleImpl(
  private val context: ReactApplicationContext,
  private val testingBridge: TTRTestingBridgeProtocol = DefaultTestingBridge,
) {

  private var scanPromise: Promise? = null
  internal var runtime: TTRRuntimeProtocol = DefaultRuntime(context)
  internal var runScan: (Context, String?, String?, (ScanOutcome) -> Unit) -> Unit =
    { from, configJson, optionsJson, completion ->
      AnylineTireTreadScanner().scan(
        from = from,
        configJson = configJson,
        optionsJson = optionsJson,
        completion = completion,
      )
    }

  fun invalidate() {
    scanPromise = null
  }

  fun initialize(options: ReadableMap, promise: Promise) {
    val licenseKey = options.getString("licenseKey")?.trim().orEmpty()
    val customTag = options.getString("customTag")?.trim().takeUnless { it.isNullOrEmpty() }

    runtime.initialize(
      licenseKey = licenseKey,
      options = InitOptions(customTag = customTag, wrapperInfo = WrapperInfo.ReactNative(BuildConfig.WRAPPER_VERSION)),
    ) { result ->
      resolveOnJs {
        promise.resolve(BridgeValue.toWritableMap(Bridge.unit(result)))
      }
    }
  }

  fun scan(options: ReadableMap, promise: Promise) {
    if (scanPromise != null) {
      val outcome =
        FailedOutcome(
          measurementUUID = null,
          error =
            SdkError(
              code = ErrorCode.ALREADY_RUNNING,
              message = "Another scan is already running.",
            ),
        )
      promise.resolve(BridgeValue.toWritableMap(sanitizedOutcome(outcome)))
      return
    }

    val configJson = options.getString("configJson")
    val optionsJson = options.getString("optionsJson")

    scanPromise = promise
    runScan(context.currentActivity ?: context, configJson, optionsJson, ::resolveScanPromise)
  }

  fun getResult(options: ReadableMap, promise: Promise) {
    val measurementUUID = options.getString("measurementUUID")?.trim().orEmpty()
    val timeoutSeconds = options.getIntOrNull("timeoutSeconds")

    runtime.getResult(
      measurementUUID = measurementUUID,
      timeoutSeconds = timeoutSeconds,
    ) { result ->
      resolveOnJs {
        promise.resolve(BridgeValue.toWritableMap(Bridge.result(result)))
      }
    }
  }

  fun getHeatmap(options: ReadableMap, promise: Promise) {
    val measurementUUID = options.getString("measurementUUID")?.trim().orEmpty()
    val timeoutSeconds = options.getIntOrNull("timeoutSeconds")

    runtime.getHeatmap(
      measurementUUID = measurementUUID,
      timeoutSeconds = timeoutSeconds,
    ) { result ->
      resolveOnJs {
        promise.resolve(BridgeValue.toWritableMap(Bridge.heatmap(result)))
      }
    }
  }

  fun setTestingConfig(options: ReadableMap, promise: Promise) {
    testingBridge.setTestingConfig(options.toJsonString())
    promise.resolve(null)
  }

  fun clearTestingConfig(promise: Promise) {
    testingBridge.clearTestingConfig()
    promise.resolve(null)
  }

  fun sendCommentFeedback(options: ReadableMap, promise: Promise) {
    val measurementUUID = options.getString("measurementUUID")?.trim().orEmpty()
    val comment = options.getString("comment")?.trim().orEmpty()

    runtime.sendCommentFeedback(measurementUUID = measurementUUID, comment = comment) { result ->
      resolveOnJs {
        promise.resolve(BridgeValue.toWritableMap(Bridge.measurementInfo(result)))
      }
    }
  }

  fun sendTreadDepthResultFeedback(options: ReadableMap, promise: Promise) {
    val measurementUUID = options.getString("measurementUUID")?.trim().orEmpty()
    val regions = options.getArray("treadResultRegions") ?: Arguments.createArray()

    val decoded = regions.toTreadResultRegions()

    runtime.sendTreadDepthResultFeedback(
      measurementUUID = measurementUUID,
      treadResultRegions = decoded,
    ) { result ->
      resolveOnJs {
        promise.resolve(BridgeValue.toWritableMap(Bridge.measurementInfo(result)))
      }
    }
  }

  fun sendTireIdFeedback(options: ReadableMap, promise: Promise) {
    val measurementUUID = options.getString("measurementUUID")?.trim().orEmpty()
    val tireId = options.getString("tireId")?.trim().orEmpty()

    runtime.sendTireIdFeedback(measurementUUID = measurementUUID, tireId = tireId) { result ->
      resolveOnJs {
        promise.resolve(BridgeValue.toWritableMap(Bridge.measurementInfo(result)))
      }
    }
  }

  fun getSdkVersion(promise: Promise) {
    promise.resolve(runtime.sdkVersion)
  }

  fun getWrapperVersion(promise: Promise) {
    promise.resolve(BuildConfig.WRAPPER_VERSION)
  }

  private fun ReadableArray.toTreadResultRegions(): List<TreadResultRegion> {
    val out = ArrayList<TreadResultRegion>(size())
    for (i in 0 until size()) {
      val value = getMap(i) ?: continue
      val available = value.getBooleanOrNull("available") ?: false
      val valueMm = value.getDoubleOrNull("value_mm") ?: 0.0
      out.add(TreadResultRegion.initMm(available, valueMm))
    }
    return out
  }

  private fun ReadableMap.getIntOrNull(key: String): Int? {
    if (!hasKey(key) || isNull(key)) return null
    return try {
      getInt(key)
    } catch (_: Throwable) {
      null
    }
  }

  private fun ReadableMap.getDoubleOrNull(key: String): Double? {
    if (!hasKey(key) || isNull(key)) return null
    return try {
      getDouble(key)
    } catch (_: Throwable) {
      null
    }
  }

  private fun ReadableMap.getBooleanOrNull(key: String): Boolean? {
    if (!hasKey(key) || isNull(key)) return null
    return try {
      getBoolean(key)
    } catch (_: Throwable) {
      null
    }
  }

  private fun ReadableMap.toJsonString(): String = toJsonObject().toString()

  private fun ReadableMap.toJsonObject(): JsonObject =
    buildJsonObject {
      val iterator = keySetIterator()
      while (iterator.hasNextKey()) {
        val key = iterator.nextKey()
        put(key, toJsonValue(key))
      }
    }

  private fun ReadableMap.toJsonValue(key: String): JsonElement =
    when (getType(key)) {
      ReadableType.Null -> JsonNull
      ReadableType.Boolean -> JsonPrimitive(getBoolean(key))
      ReadableType.Number -> JsonPrimitive(getDouble(key))
      ReadableType.String -> getString(key)?.let(::JsonPrimitive) ?: JsonNull
      ReadableType.Map -> getMap(key)?.toJsonObject() ?: JsonNull
      ReadableType.Array -> getArray(key)?.toJsonArray() ?: JsonNull
    }

  private fun ReadableArray.toJsonArray(): JsonArray =
    buildJsonArray {
      for (index in 0 until size()) {
        add(
          when (getType(index)) {
            ReadableType.Null -> JsonNull
            ReadableType.Boolean -> JsonPrimitive(getBoolean(index))
            ReadableType.Number -> JsonPrimitive(getDouble(index))
            ReadableType.String -> getString(index)?.let(::JsonPrimitive) ?: JsonNull
            ReadableType.Map -> getMap(index)?.toJsonObject() ?: JsonNull
            ReadableType.Array -> getArray(index)?.toJsonArray() ?: JsonNull
          },
        )
      }
    }

  private fun resolveOnJs(block: Runnable) {
    if (!context.hasActiveCatalystInstance()) {
      return
    }
    context.runOnJSQueueThread(block)
  }

  private fun resolveScanPromise(outcome: ScanOutcome) {
    val promise = scanPromise ?: return
    scanPromise = null
    resolveOnJs {
      promise.resolve(BridgeValue.toWritableMap(sanitizedOutcome(outcome)))
    }
  }

  private fun sanitizedOutcome(outcome: ScanOutcome): Map<String, Any?> =
    Bridge.outcome(outcome).filterKeys { key -> key in OUTCOME_KEYS }

  companion object {
    const val NAME = "AnylineTtrMobileWrapperReactNative"
    private val OUTCOME_KEYS = setOf("kind", "measurementUUID", "error")
  }
}

internal interface TTRRuntimeProtocol {
  val sdkVersion: String

  fun initialize(licenseKey: String, options: InitOptions, onComplete: (SdkResult<Unit>) -> Unit)

  fun getResult(
    measurementUUID: String,
    timeoutSeconds: Int?,
    onComplete: (SdkResult<TreadDepthResult>) -> Unit,
  )

  fun getHeatmap(
    measurementUUID: String,
    timeoutSeconds: Int?,
    onComplete: (SdkResult<Heatmap>) -> Unit,
  )

  fun sendCommentFeedback(
    measurementUUID: String,
    comment: String,
    onComplete: (SdkResult<MeasurementInfo>) -> Unit,
  )

  fun sendTreadDepthResultFeedback(
    measurementUUID: String,
    treadResultRegions: List<TreadResultRegion>,
    onComplete: (SdkResult<MeasurementInfo>) -> Unit,
  )

  fun sendTireIdFeedback(
    measurementUUID: String,
    tireId: String,
    onComplete: (SdkResult<MeasurementInfo>) -> Unit,
  )
}

internal interface TTRTestingBridgeProtocol {
  fun setTestingConfig(json: String)

  fun clearTestingConfig()
}

internal object DefaultTestingBridge : TTRTestingBridgeProtocol {
  @OptIn(InternalAPI::class)
  override fun setTestingConfig(json: String) {
    AnylineTireTreadSdk.setTestingConfig(json)
  }

  @OptIn(InternalAPI::class)
  override fun clearTestingConfig() {
    AnylineTireTreadSdk.clearTestingConfig()
  }
}

internal class DefaultRuntime(
  private val context: Context,
) : TTRRuntimeProtocol {
  override val sdkVersion: String
    get() = AnylineTireTread.sdkVersion

  override fun initialize(
    licenseKey: String,
    options: InitOptions,
    onComplete: (SdkResult<Unit>) -> Unit,
  ) {
    AnylineTireTread.initialize(context = context, licenseKey = licenseKey, options = options, onComplete = onComplete)
  }

  override fun getResult(
    measurementUUID: String,
    timeoutSeconds: Int?,
    onComplete: (SdkResult<TreadDepthResult>) -> Unit,
  ) {
    if (timeoutSeconds == null) {
      AnylineTireTread.getResult(measurementUUID = measurementUUID, onComplete = onComplete)
    } else {
      AnylineTireTread.getResult(
        measurementUUID = measurementUUID,
        timeoutSeconds = timeoutSeconds,
        onComplete = onComplete,
      )
    }
  }

  override fun getHeatmap(
    measurementUUID: String,
    timeoutSeconds: Int?,
    onComplete: (SdkResult<Heatmap>) -> Unit,
  ) {
    if (timeoutSeconds == null) {
      AnylineTireTread.getHeatmap(measurementUUID = measurementUUID, onComplete = onComplete)
    } else {
      AnylineTireTread.getHeatmap(
        measurementUUID = measurementUUID,
        timeoutSeconds = timeoutSeconds,
        onComplete = onComplete,
      )
    }
  }

  override fun sendCommentFeedback(
    measurementUUID: String,
    comment: String,
    onComplete: (SdkResult<MeasurementInfo>) -> Unit,
  ) {
    AnylineTireTread.sendCommentFeedback(
      measurementUUID = measurementUUID,
      comment = comment,
      onComplete = onComplete,
    )
  }

  override fun sendTreadDepthResultFeedback(
    measurementUUID: String,
    treadResultRegions: List<TreadResultRegion>,
    onComplete: (SdkResult<MeasurementInfo>) -> Unit,
  ) {
    AnylineTireTread.sendTreadDepthResultFeedback(
      measurementUUID = measurementUUID,
      treadResultRegions = treadResultRegions,
      onComplete = onComplete,
    )
  }

  override fun sendTireIdFeedback(
    measurementUUID: String,
    tireId: String,
    onComplete: (SdkResult<MeasurementInfo>) -> Unit,
  ) {
    AnylineTireTread.sendTireIdFeedback(
      measurementUUID = measurementUUID,
      tireId = tireId,
      onComplete = onComplete,
    )
  }
}
