package com.anyline.ttr.reactnative

import android.content.Context
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.JavaOnlyArray
import com.facebook.react.bridge.JavaOnlyMap
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.WritableMap
import io.anyline.tiretread.sdk.api.AbortedOutcome
import io.anyline.tiretread.sdk.api.ErrorCode
import io.anyline.tiretread.sdk.api.InitOptions
import io.anyline.tiretread.sdk.api.ScanOutcome
import io.anyline.tiretread.sdk.api.SdkError
import io.anyline.tiretread.sdk.api.SdkResult
import io.anyline.tiretread.sdk.types.Heatmap
import io.anyline.tiretread.sdk.types.MeasurementInfo
import io.anyline.tiretread.sdk.types.TreadDepthResult
import io.anyline.tiretread.sdk.types.TreadResultRegion
import io.anyline.tiretread.sdk.types.WrapperInfo
import io.mockk.every
import io.mockk.mockk
import io.mockk.mockkStatic
import io.mockk.unmockkAll
import org.junit.After
import org.junit.Before
import org.junit.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotNull
import kotlin.test.assertNull
import kotlin.test.assertTrue

private class FakeRuntime : TTRRuntimeProtocol {
  override val sdkVersion: String = "15.0.1"

  var nextInit: SdkResult<Unit> = SdkResult.Ok(Unit)
  var nextResult: SdkResult<TreadDepthResult> = SdkResult.Err(
    SdkError(code = ErrorCode.INTERNAL_ERROR, message = "not configured")
  )
  var nextHeatmap: SdkResult<Heatmap> = SdkResult.Err(
    SdkError(code = ErrorCode.INTERNAL_ERROR, message = "not configured")
  )
  var nextCommentFeedback: SdkResult<MeasurementInfo> = SdkResult.Err(
    SdkError(code = ErrorCode.INTERNAL_ERROR, message = "not configured")
  )
  var nextTreadDepthFeedback: SdkResult<MeasurementInfo> = SdkResult.Err(
    SdkError(code = ErrorCode.INTERNAL_ERROR, message = "not configured")
  )
  var nextTireIdFeedback: SdkResult<MeasurementInfo> = SdkResult.Err(
    SdkError(code = ErrorCode.INTERNAL_ERROR, message = "not configured")
  )

  var lastInitLicenseKey: String? = null
  var lastInitCustomTag: String? = null
  var lastInitWrapperVersion: String? = null
  var lastGetResultUuid: String? = null
  var lastGetResultTimeout: Int? = null
  var lastGetHeatmapUuid: String? = null
  var lastGetHeatmapTimeout: Int? = null
  var lastCommentUuid: String? = null
  var lastCommentText: String? = null
  var lastTireIdUuid: String? = null
  var lastTireIdText: String? = null
  var lastTreadDepthResultUuid: String? = null
  var lastTreadDepthRegions: List<TreadResultRegion>? = null

  override fun initialize(
    licenseKey: String,
    options: InitOptions,
    onComplete: (SdkResult<Unit>) -> Unit,
  ) {
    lastInitLicenseKey = licenseKey
    lastInitCustomTag = options.customTag
    lastInitWrapperVersion = (options.wrapperInfo as? WrapperInfo.ReactNative)?.version
    onComplete(nextInit)
  }

  override fun getResult(
    measurementUUID: String,
    timeoutSeconds: Int?,
    onComplete: (SdkResult<TreadDepthResult>) -> Unit,
  ) {
    lastGetResultUuid = measurementUUID
    lastGetResultTimeout = timeoutSeconds
    onComplete(nextResult)
  }

  override fun getHeatmap(
    measurementUUID: String,
    timeoutSeconds: Int?,
    onComplete: (SdkResult<Heatmap>) -> Unit,
  ) {
    lastGetHeatmapUuid = measurementUUID
    lastGetHeatmapTimeout = timeoutSeconds
    onComplete(nextHeatmap)
  }

  override fun sendCommentFeedback(
    measurementUUID: String,
    comment: String,
    onComplete: (SdkResult<MeasurementInfo>) -> Unit,
  ) {
    lastCommentUuid = measurementUUID
    lastCommentText = comment
    onComplete(nextCommentFeedback)
  }

  override fun sendTreadDepthResultFeedback(
    measurementUUID: String,
    treadResultRegions: List<TreadResultRegion>,
    onComplete: (SdkResult<MeasurementInfo>) -> Unit,
  ) {
    lastTreadDepthResultUuid = measurementUUID
    lastTreadDepthRegions = treadResultRegions
    onComplete(nextTreadDepthFeedback)
  }

  override fun sendTireIdFeedback(
    measurementUUID: String,
    tireId: String,
    onComplete: (SdkResult<MeasurementInfo>) -> Unit,
  ) {
    lastTireIdUuid = measurementUUID
    lastTireIdText = tireId
    onComplete(nextTireIdFeedback)
  }
}

private class FakeScanner {
  var lastScanFrom: Context? = null
  var lastScanConfigJson: String? = null
  var scanCallCount: Int = 0
  var pendingScanCompletion: ((ScanOutcome) -> Unit)? = null

  fun scan(
    from: Context,
    configJson: String?,
    optionsJson: String?,
    completion: (ScanOutcome) -> Unit,
  ) {
    lastScanFrom = from
    lastScanConfigJson = configJson
    scanCallCount++
    pendingScanCompletion = completion
  }
}

private class FakeTestingBridge : TTRTestingBridgeProtocol {
  var lastSetJson: String? = null
  var clearCount: Int = 0

  override fun setTestingConfig(json: String) {
    lastSetJson = json
  }

  override fun clearTestingConfig() {
    clearCount += 1
  }
}

private class CapturingPromise : Promise {
  var resolvedValue: Any? = null
  var resolveCount: Int = 0
  var rejectedCode: String? = null
  var rejectedMessage: String? = null

  override fun resolve(value: Any?) {
    resolveCount += 1
    resolvedValue = value
  }

  override fun reject(code: String, message: String?) { rejectedCode = code; rejectedMessage = message }
  override fun reject(code: String, throwable: Throwable?) { rejectedCode = code }
  override fun reject(code: String, message: String?, throwable: Throwable?) { rejectedCode = code; rejectedMessage = message }
  override fun reject(throwable: Throwable) { rejectedCode = "ERROR" }
  override fun reject(throwable: Throwable, userInfo: WritableMap) { rejectedCode = "ERROR" }
  override fun reject(code: String, userInfo: WritableMap) { rejectedCode = code }
  override fun reject(code: String, throwable: Throwable?, userInfo: WritableMap) { rejectedCode = code }
  override fun reject(code: String, message: String?, userInfo: WritableMap) { rejectedCode = code; rejectedMessage = message }
  override fun reject(code: String?, message: String?, throwable: Throwable?, userInfo: WritableMap?) { rejectedCode = code; rejectedMessage = message }

  @Deprecated("Use reject(code, message)", ReplaceWith("reject(code, message)"))
  override fun reject(message: String) { rejectedMessage = message }
}

class TTRReactNativeModuleImplTest {

  private lateinit var impl: TTRReactNativeModuleImpl
  private lateinit var fakeRuntime: FakeRuntime
  private lateinit var fakeScanner: FakeScanner
  private lateinit var fakeTestingBridge: FakeTestingBridge

  @Before
  fun setUp() {
    mockkStatic(Arguments::class)
    every { Arguments.createMap() } answers { JavaOnlyMap() }
    every { Arguments.createArray() } answers { JavaOnlyArray() }

    val mockContext = mockk<ReactApplicationContext>(relaxed = true)
    every { mockContext.currentActivity } returns null
    every { mockContext.hasActiveCatalystInstance() } returns true
    every { mockContext.runOnJSQueueThread(any()) } answers {
      firstArg<Runnable>().run()
      true
    }

    fakeRuntime = FakeRuntime()
    fakeScanner = FakeScanner()
    fakeTestingBridge = FakeTestingBridge()
    impl = TTRReactNativeModuleImpl(mockContext, fakeTestingBridge)
    impl.runtime = fakeRuntime
    impl.runScan = fakeScanner::scan
  }

  @After
  fun tearDown() {
    impl.invalidate()
    unmockkAll()
  }

  @Test
  fun `scanner is non-null by default`() {
    val mockContext = mockk<ReactApplicationContext>(relaxed = true)
    every { mockContext.hasActiveCatalystInstance() } returns true
    every { mockContext.runOnJSQueueThread(any()) } answers {
      firstArg<Runnable>().run()
      true
    }

    val fresh = TTRReactNativeModuleImpl(mockContext)
    assertNotNull(fresh.runScan)
  }

  @Test
  fun `initialize forwards license customTag and wrapper version`() {
    val promise = CapturingPromise()
    val options = JavaOnlyMap().apply {
      putString("licenseKey", " license ")
      putString("customTag", " wrapper-tag ")
    }

    impl.initialize(options, promise)

    assertEquals("license", fakeRuntime.lastInitLicenseKey)
    assertEquals("wrapper-tag", fakeRuntime.lastInitCustomTag)
    assertEquals(BuildConfig.WRAPPER_VERSION, fakeRuntime.lastInitWrapperVersion)
  }

  @Test
  fun `getResult forwards uuid and explicit timeout`() {
    val promise = CapturingPromise()
    val options = JavaOnlyMap().apply {
      putString("measurementUUID", "abc-123")
      putInt("timeoutSeconds", 30)
    }

    impl.getResult(options, promise)

    assertEquals("abc-123", fakeRuntime.lastGetResultUuid)
    assertEquals(30, fakeRuntime.lastGetResultTimeout)
  }

  @Test
  fun `getResult delegates default timeout to sdk when omitted`() {
    val promise = CapturingPromise()
    val options = JavaOnlyMap().apply {
      putString("measurementUUID", "abc-123")
    }

    impl.getResult(options, promise)

    assertEquals("abc-123", fakeRuntime.lastGetResultUuid)
    assertNull(fakeRuntime.lastGetResultTimeout)
  }

  @Test
  fun `getHeatmap delegates default timeout to sdk when omitted`() {
    val promise = CapturingPromise()
    val options = JavaOnlyMap().apply {
      putString("measurementUUID", "hm-uuid")
    }

    impl.getHeatmap(options, promise)

    assertEquals("hm-uuid", fakeRuntime.lastGetHeatmapUuid)
    assertNull(fakeRuntime.lastGetHeatmapTimeout)
  }

  @Test
  fun `getHeatmap forwards explicit timeout`() {
    val promise = CapturingPromise()
    val options = JavaOnlyMap().apply {
      putString("measurementUUID", "hm-uuid")
      putInt("timeoutSeconds", 12)
    }

    impl.getHeatmap(options, promise)

    assertEquals("hm-uuid", fakeRuntime.lastGetHeatmapUuid)
    assertEquals(12, fakeRuntime.lastGetHeatmapTimeout)
  }

  @Test
  fun `sendCommentFeedback forwards uuid and comment`() {
    val promise = CapturingPromise()
    val options = JavaOnlyMap().apply {
      putString("measurementUUID", "feedback-uuid")
      putString("comment", "Great scan!")
    }

    impl.sendCommentFeedback(options, promise)

    waitFor { fakeRuntime.lastCommentUuid != null }
    assertEquals("feedback-uuid", fakeRuntime.lastCommentUuid)
    assertEquals("Great scan!", fakeRuntime.lastCommentText)
  }

  @Test
  fun `sendTireIdFeedback forwards uuid and tireId`() {
    val promise = CapturingPromise()
    val options = JavaOnlyMap().apply {
      putString("measurementUUID", "tire-uuid")
      putString("tireId", "TIRE-123")
    }

    impl.sendTireIdFeedback(options, promise)

    waitFor { fakeRuntime.lastTireIdUuid != null }
    assertEquals("tire-uuid", fakeRuntime.lastTireIdUuid)
    assertEquals("TIRE-123", fakeRuntime.lastTireIdText)
  }

  @Test
  fun `sendTreadDepthResultFeedback forwards resultUuid and regions`() {
    val promise = CapturingPromise()
    val regions = JavaOnlyArray().apply {
      pushMap(JavaOnlyMap().apply {
        putBoolean("available", true)
        putDouble("value_mm", 5.5)
      })
      pushMap(JavaOnlyMap().apply {
        putBoolean("available", false)
        putDouble("value_mm", 0.0)
      })
    }
    val options = JavaOnlyMap().apply {
      putString("measurementUUID", "result-uuid-456")
      putArray("treadResultRegions", regions)
    }

    impl.sendTreadDepthResultFeedback(options, promise)

    waitFor { fakeRuntime.lastTreadDepthResultUuid != null }
    assertEquals("result-uuid-456", fakeRuntime.lastTreadDepthResultUuid)
    assertNotNull(fakeRuntime.lastTreadDepthRegions)
    assertEquals(2, fakeRuntime.lastTreadDepthRegions!!.size)
    assertTrue(fakeRuntime.lastTreadDepthRegions!![0].isAvailable)
    assertEquals(5.5, fakeRuntime.lastTreadDepthRegions!![0].valueMm, 0.001)
  }

  @Test
  fun `getResult err resolves with ok false`() {
    fakeRuntime.nextResult = SdkResult.Err(
      SdkError(code = ErrorCode.RESULT_ERROR, message = "Processing failed")
    )

    val promise = CapturingPromise()
    val options = JavaOnlyMap().apply {
      putString("measurementUUID", "err-uuid")
    }

    impl.getResult(options, promise)

    val map = promise.resolvedValue as WritableMap
    assertEquals(false, map.getBoolean("ok"))
    assertEquals("RESULT_ERROR", map.getMap("error")!!.getString("code"))
  }

  @Test
  fun `scan without activity delegates to sdk with context fallback`() {
    val promise = CapturingPromise()
    val options = JavaOnlyMap().apply {
      putString("configJson", "{}")
    }

    impl.scan(options, promise)

    assertEquals(1, fakeScanner.scanCallCount)
    assertEquals("{}", fakeScanner.lastScanConfigJson)
  }

  @Test
  fun `scan without configJson passes null to sdk`() {
    val promise = CapturingPromise()

    impl.scan(JavaOnlyMap(), promise)

    assertEquals(1, fakeScanner.scanCallCount)
    assertNull(fakeScanner.lastScanConfigJson)
  }

  @Test
  fun `scan already running returns already running error`() {
    impl.scan(JavaOnlyMap(), CapturingPromise())

    val secondPromise = CapturingPromise()
    impl.scan(JavaOnlyMap(), secondPromise)

    val map = secondPromise.resolvedValue as WritableMap
    assertEquals("ALREADY_RUNNING", map.getMap("error")!!.getString("code"))
    assertTrue(mapKeys(map).all { it in setOf("kind", "measurementUUID", "error") })
  }

  @Test
  fun `scan completion resolves only once even if sdk callback repeats`() {
    val promise = CapturingPromise()

    impl.scan(JavaOnlyMap(), promise)

    val completion = fakeScanner.pendingScanCompletion
    assertNotNull(completion)

    completion.invoke(
      AbortedOutcome(measurementUUID = "measurement-1")
    )
    completion.invoke(
      AbortedOutcome(measurementUUID = "measurement-2")
    )

    assertEquals(1, promise.resolveCount)
    val map = promise.resolvedValue as WritableMap
    assertEquals("measurement-1", map.getString("measurementUUID"))
    assertTrue(mapKeys(map).all { it in setOf("kind", "measurementUUID", "error") })
  }

  @Test
  fun `getSdkVersion resolves scanner sdk version`() {
    val promise = CapturingPromise()

    impl.getSdkVersion(promise)

    assertEquals("15.0.1", promise.resolvedValue)
  }

  @Test
  fun `setTestingConfig serializes payload and resolves`() {
    val promise = CapturingPromise()
    val options = JavaOnlyMap().apply {
      putBoolean("autostart", true)
      putDouble("distance", 123.4)
    }

    impl.setTestingConfig(options, promise)

    assertEquals(1, promise.resolveCount)
    assertNull(promise.resolvedValue)
    assertNotNull(fakeTestingBridge.lastSetJson)
    assertTrue(fakeTestingBridge.lastSetJson!!.contains("\"autostart\":true"))
    assertTrue(fakeTestingBridge.lastSetJson!!.contains("\"distance\":123.4"))
  }

  @Test
  fun `clearTestingConfig delegates and resolves`() {
    val promise = CapturingPromise()

    impl.clearTestingConfig(promise)

    assertEquals(1, promise.resolveCount)
    assertNull(promise.resolvedValue)
    assertEquals(1, fakeTestingBridge.clearCount)
  }

  @Test
  fun `getWrapperVersion resolves package version`() {
    val promise = CapturingPromise()

    impl.getWrapperVersion(promise)

    assertEquals(BuildConfig.WRAPPER_VERSION, promise.resolvedValue)
  }

  private fun waitFor(timeoutMs: Long = 1_000, condition: () -> Boolean) {
    val deadline = System.currentTimeMillis() + timeoutMs
    while (!condition()) {
      if (System.currentTimeMillis() >= deadline) {
        throw AssertionError("Condition was not met within ${timeoutMs}ms")
      }
      Thread.sleep(10)
    }
  }

  private fun mapKeys(map: WritableMap): Set<String> {
    val iterator = map.keySetIterator()
    val keys = mutableSetOf<String>()
    while (iterator.hasNextKey()) {
      keys += iterator.nextKey()
    }
    return keys
  }
}
