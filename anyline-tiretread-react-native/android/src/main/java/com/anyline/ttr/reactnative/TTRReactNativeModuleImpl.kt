package com.anyline.ttr.reactnative

import android.content.Context
import android.util.Base64
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.ReadableType
import io.anyline.tiretread.sdk.InternalAPI
import io.anyline.tiretread.sdk.AnylineTireTreadSdk
import io.anyline.tiretread.sdk.api.AnylineTireSidewallScanner
import io.anyline.tiretread.sdk.api.AnylineTireTread
import io.anyline.tiretread.sdk.api.AnylineTireTreadScanner
import io.anyline.tiretread.sdk.api.Bridge
import io.anyline.tiretread.sdk.api.ErrorCode
import io.anyline.tiretread.sdk.api.FailedOutcome
import io.anyline.tiretread.sdk.api.InitOptions
import io.anyline.tiretread.sdk.api.ScanOutcome
import io.anyline.tiretread.sdk.api.SdkError
import io.anyline.tiretread.sdk.api.SdkResult
import io.anyline.tiretread.sdk.api.TswScanResult
import io.anyline.tiretread.sdk.api.TswSupportStatus
import io.anyline.tiretread.sdk.tsw.ui.configs.TswScannerConfig
import io.anyline.tiretread.sdk.types.Heatmap
import io.anyline.tiretread.sdk.types.MeasurementInfo
import io.anyline.tiretread.sdk.types.TreadDepthResult
import io.anyline.tiretread.sdk.types.TreadResultRegion
import io.anyline.tiretread.sdk.types.WrapperInfo
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.cancel
import kotlinx.coroutines.launch
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonNull
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.buildJsonArray
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.contentOrNull
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive

internal class TTRReactNativeModuleImpl(
  private val context: ReactApplicationContext,
  private val testingBridge: TTRTestingBridgeProtocol = DefaultTestingBridge,
) {

  private var scanPromise: Promise? = null
  private var sidewallScanPromise: Promise? = null
  // The sidewall scanner's isSupported() is a suspend function; run it on Main.
  private val sidewallScope = CoroutineScope(Dispatchers.Main + SupervisorJob())
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
    sidewallScanPromise = null
    sidewallScope.cancel()
  }

  fun isDeviceSupported(promise: Promise) {
    AnylineTireTread.isDeviceSupported(context.currentActivity ?: context) { result ->
      resolveOnJs {
        promise.resolve(BridgeValue.toWritableMap(Bridge.boolean(result)))
      }
    }
  }

  fun initialize(options: ReadableMap, promise: Promise) {
    val licenseKey = options.getString("licenseKey")?.trim().orEmpty()
    val customTag = options.getString("customTag")?.trim().takeUnless { it.isNullOrEmpty() }
    val uploadTimeoutMillis = options.getDoubleOrNull("uploadTimeoutMillis")?.toLong()

    val baseOptions = InitOptions(
      customTag = customTag,
      wrapperInfo = WrapperInfo.ReactNative(BuildConfig.WRAPPER_VERSION),
    )
    val initOptions = uploadTimeoutMillis
      ?.let { baseOptions.copy(uploadTimeoutMillis = it) }
      ?: baseOptions

    runtime.initialize(
      licenseKey = licenseKey,
      options = initOptions,
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

  fun tireSidewallScan(options: ReadableMap, promise: Promise) {
    if (sidewallScanPromise != null) {
      promise.resolve(
        BridgeValue.toWritableMap(
          sidewallFailed(ErrorCode.ALREADY_RUNNING, "A sidewall scan is already in progress."),
        ),
      )
      return
    }

    val clientId = options.getString("clientId")?.trim().orEmpty()
    val configJson = options.getString("configJson")

    sidewallScanPromise = promise
    AnylineTireSidewallScanner().scan(
      from = context.currentActivity ?: context,
      clientId = clientId,
      config = buildSidewallConfig(configJson),
    ) { result ->
      val pending = sidewallScanPromise ?: return@scan
      sidewallScanPromise = null
      resolveOnJs {
        pending.resolve(BridgeValue.toWritableMap(serializeSidewall(result)))
      }
    }
  }

  fun tireSidewallIsSupported(promise: Promise) {
    sidewallScope.launch {
      val status =
        runCatching { AnylineTireSidewallScanner.isSupported() }
          .getOrElse { t ->
            TswSupportStatus.Unavailable(
              error =
                SdkError(
                  code = ErrorCode.INTERNAL_ERROR,
                  message = t.message ?: "Failed to check device support.",
                ),
              userResolvable = false,
            )
          }
      resolveOnJs {
        promise.resolve(BridgeValue.toWritableMap(serializeSidewall(status)))
      }
    }
  }

  fun tireSidewallResolvePlayServices(promise: Promise) {
    context.currentActivity?.let { AnylineTireSidewallScanner.resolvePlayServices(it) }
    promise.resolve(null)
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

  // internal (not private) so unit tests in the same module can exercise the
  // hand-serialization and config-mapping directly; the SDK scanner itself is
  // not injectable here.
  internal fun serializeSidewall(result: TswScanResult): Map<String, Any?> =
    when (result) {
      is TswScanResult.Completed ->
        mapOf(
          "kind" to "completed",
          "resultJson" to result.resultJson,
          "imageBase64" to Base64.encodeToString(result.imageBytes, Base64.NO_WRAP),
          "lighting" to result.scanMetadata.environmentLighting?.name,
        )
      is TswScanResult.Failed ->
        mapOf(
          "kind" to "failed",
          "error" to result.error.toMap(),
        )
      TswScanResult.Aborted -> mapOf("kind" to "aborted")
    }

  internal fun serializeSidewall(status: TswSupportStatus): Map<String, Any?> =
    when (status) {
      is TswSupportStatus.Unavailable ->
        mapOf(
          "supported" to false,
          "userResolvable" to status.userResolvable,
          "error" to status.error.toMap(),
        )
      else -> mapOf("supported" to true, "userResolvable" to false)
    }

  private fun sidewallFailed(code: ErrorCode, message: String): Map<String, Any?> =
    mapOf(
      "kind" to "failed",
      "error" to SdkError(code = code, message = message).toMap(),
    )

  internal fun buildSidewallConfig(configJson: String?): TswScannerConfig {
    val config = TswScannerConfig()
    if (configJson.isNullOrBlank()) return config

    val root =
      runCatching { Json.parseToJsonElement(configJson).jsonObject }.getOrNull()
        ?: return config

    root["correlationId"]?.jsonPrimitive?.contentOrNull?.let { config.correlationId = it }

    (root["texts"] as? JsonObject)?.let { texts ->
      fun str(key: String): String? = texts[key]?.jsonPrimitive?.contentOrNull
      str("initializing")?.let { config.texts.textInitializing = it }
      str("alignTire")?.let { config.texts.textAlignTire = it }
      str("moveCloser")?.let { config.texts.textMoveCloser = it }
      str("moveAway")?.let { config.texts.textMoveAway = it }
      str("faceTire")?.let { config.texts.textFaceTire = it }
      str("ready")?.let { config.texts.textReady = it }
      str("holdSteady")?.let { config.texts.textHoldSteady = it }
      str("focusing")?.let { config.texts.textFocusing = it }
      str("calibratingWhiteBalance")?.let { config.texts.textCalibratingWhiteBalance = it }
      str("calibratingExposure")?.let { config.texts.textCalibratingExposure = it }
      str("tooDark")?.let { config.texts.textTooDark = it }
    }
    return config
  }

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
