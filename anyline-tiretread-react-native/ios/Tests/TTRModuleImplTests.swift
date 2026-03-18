import XCTest
import AnylineTireTreadSdk
import UIKit
@testable import TTRModuleImpl

private func makeErrorSdkResult<T: AnyObject>() -> SdkResult<T> {
  ScanOptions.Companion.shared.fromJson(json: "{") as! SdkResult<T>
}

final class FakeRuntime: TTRRuntimeProtocol {
  var sdkVersion: String = "15.0.1"

  var nextInit: SdkResult<KotlinUnit> = makeErrorSdkResult()
  var nextResult: SdkResult<TreadDepthResult> = makeErrorSdkResult()
  var nextHeatmap: SdkResult<Heatmap> = makeErrorSdkResult()
  var nextCommentFeedback: SdkResult<MeasurementInfo> = makeErrorSdkResult()
  var nextTreadDepthFeedback: SdkResult<MeasurementInfo> = makeErrorSdkResult()
  var nextTireIdFeedback: SdkResult<MeasurementInfo> = makeErrorSdkResult()

  var lastInitLicenseKey: String?
  var lastInitCustomTag: String?
  var lastInitWrapperVersion: String?
  var lastGetResultUuid: String?
  var lastGetResultTimeout: Int32?
  var lastGetHeatmapUuid: String?
  var lastGetHeatmapTimeout: Int32?
  var lastCommentUuid: String?
  var lastCommentText: String?
  var lastTireIdUuid: String?
  var lastTireIdText: String?
  var lastTreadDepthResultUuid: String?
  var lastTreadDepthRegions: [TreadResultRegion]?

  func initialize(
    licenseKey: String,
    options: InitOptions,
    onComplete: @escaping (SdkResult<KotlinUnit>) -> Void
  ) {
    lastInitLicenseKey = licenseKey
    lastInitCustomTag = options.customTag
    lastInitWrapperVersion = options.wrapperInfo?.version
    onComplete(nextInit)
  }

  func getResult(
    measurementUUID: String,
    timeoutSeconds: Int32?,
    onComplete: @escaping (SdkResult<TreadDepthResult>) -> Void
  ) {
    lastGetResultUuid = measurementUUID
    lastGetResultTimeout = timeoutSeconds
    onComplete(nextResult)
  }

  func getHeatmap(
    measurementUUID: String,
    timeoutSeconds: Int32?,
    onComplete: @escaping (SdkResult<Heatmap>) -> Void
  ) {
    lastGetHeatmapUuid = measurementUUID
    lastGetHeatmapTimeout = timeoutSeconds
    onComplete(nextHeatmap)
  }

  func sendCommentFeedback(
    measurementUUID: String,
    comment: String,
    onComplete: @escaping (SdkResult<MeasurementInfo>) -> Void
  ) {
    lastCommentUuid = measurementUUID
    lastCommentText = comment
    onComplete(nextCommentFeedback)
  }

  func sendTreadDepthResultFeedback(
    measurementUUID: String,
    treadResultRegions: [TreadResultRegion],
    onComplete: @escaping (SdkResult<MeasurementInfo>) -> Void
  ) {
    lastTreadDepthResultUuid = measurementUUID
    lastTreadDepthRegions = treadResultRegions
    onComplete(nextTreadDepthFeedback)
  }

  func sendTireIdFeedback(
    measurementUUID: String,
    tireId: String,
    onComplete: @escaping (SdkResult<MeasurementInfo>) -> Void
  ) {
    lastTireIdUuid = measurementUUID
    lastTireIdText = tireId
    onComplete(nextTireIdFeedback)
  }
}

final class FakeScanner: TTRScannerProtocol {
  var scanCallCount = 0
  var lastScanConfigJson: String?
  var pendingScanCompletion: ((ScanOutcome) -> Void)?

  func scan(
    from: UIViewController,
    configJson: String?,
    optionsJson: String?,
    completion: @escaping @Sendable (ScanOutcome) -> Void
  ) {
    scanCallCount += 1
    lastScanConfigJson = configJson
    pendingScanCompletion = completion
  }
}

final class FakeWrapperVersionProvider: TTRWrapperVersionProviding {
  let version: String

  init(version: String) {
    self.version = version
  }

  func currentVersion() -> String {
    version
  }
}

final class FakeTestingBridge: TTRTestingBridgeProtocol {
  var lastSetJson: String?
  var clearCount = 0

  func setTestingConfig(json: String) {
    lastSetJson = json
  }

  func clearTestingConfig() {
    clearCount += 1
  }
}

final class TTRModuleImplTests: XCTestCase {

  private var impl: TTRModuleImpl!
  private var fakeRuntime: FakeRuntime!
  private var fakeScanner: FakeScanner!
  private var fakeTestingBridge: FakeTestingBridge!
  private var fakeWrapperVersionProvider: FakeWrapperVersionProvider!

  override func setUp() {
    super.setUp()
    fakeRuntime = FakeRuntime()
    fakeScanner = FakeScanner()
    fakeTestingBridge = FakeTestingBridge()
    fakeWrapperVersionProvider = FakeWrapperVersionProvider(version: "1.0.0-test")
    impl = TTRModuleImpl(
      runtime: fakeRuntime,
      scanner: fakeScanner,
      testingBridge: fakeTestingBridge,
      wrapperVersionProvider: fakeWrapperVersionProvider
    )
  }

  override func tearDown() {
    impl = nil
    fakeRuntime = nil
    fakeScanner = nil
    fakeTestingBridge = nil
    fakeWrapperVersionProvider = nil
    super.tearDown()
  }

  func testScannerIsNonNilByDefault() {
    let fresh = TTRModuleImpl()
    XCTAssertNotNil(fresh.scanner)
  }

  func testInitializeForwardsLicenseCustomTagAndWrapperVersion() {
    let expectation = expectation(description: "initialize completes")
    let options: NSDictionary = [
      "licenseKey": " abc-license ",
      "customTag": " rn-wrapper ",
    ]

    impl.initialize(options: options) { _ in
      expectation.fulfill()
    }

    waitForExpectations(timeout: 2)
    XCTAssertEqual(fakeRuntime.lastInitLicenseKey, "abc-license")
    XCTAssertEqual(fakeRuntime.lastInitCustomTag, "rn-wrapper")
    XCTAssertEqual(fakeRuntime.lastInitWrapperVersion, "1.0.0-test")
  }

  func testResultForwardsUuidAndExplicitTimeout() {
    let options: NSDictionary = [
      "measurementUUID": "abc-123",
      "timeoutSeconds": NSNumber(value: 30),
    ]

    impl.getResult(options: options) { _ in }
    XCTAssertEqual(fakeRuntime.lastGetResultUuid, "abc-123")
    XCTAssertEqual(fakeRuntime.lastGetResultTimeout, 30)
  }

  func testResultDelegatesSdkDefaultTimeoutWhenOmitted() {
    let options: NSDictionary = [
      "measurementUUID": "abc-123",
    ]

    impl.getResult(options: options) { _ in }
    XCTAssertEqual(fakeRuntime.lastGetResultUuid, "abc-123")
    XCTAssertNil(fakeRuntime.lastGetResultTimeout)
  }

  func testHeatmapDelegatesSdkDefaultTimeoutWhenOmitted() {
    let options: NSDictionary = [
      "measurementUUID": "hm-uuid",
    ]

    impl.getHeatmap(options: options) { _ in }
    XCTAssertEqual(fakeRuntime.lastGetHeatmapUuid, "hm-uuid")
    XCTAssertNil(fakeRuntime.lastGetHeatmapTimeout)
  }

  func testHeatmapForwardsExplicitTimeout() {
    let options: NSDictionary = [
      "measurementUUID": "hm-uuid",
      "timeoutSeconds": NSNumber(value: 12),
    ]

    impl.getHeatmap(options: options) { _ in }
    XCTAssertEqual(fakeRuntime.lastGetHeatmapUuid, "hm-uuid")
    XCTAssertEqual(fakeRuntime.lastGetHeatmapTimeout, 12)
  }

  func testSendCommentFeedbackForwardsUuidAndComment() {
    let expectation = expectation(description: "sendCommentFeedback completes")
    let options: NSDictionary = [
      "measurementUUID": "feedback-uuid",
      "comment": "Great scan!",
    ]

    impl.sendCommentFeedback(options: options) { _ in
      expectation.fulfill()
    }

    waitForExpectations(timeout: 2)
    XCTAssertEqual(fakeRuntime.lastCommentUuid, "feedback-uuid")
    XCTAssertEqual(fakeRuntime.lastCommentText, "Great scan!")
  }

  func testSendTireIdFeedbackForwardsUuidAndTireId() {
    let expectation = expectation(description: "sendTireIdFeedback completes")
    let options: NSDictionary = [
      "measurementUUID": "tire-uuid",
      "tireId": "TIRE-123",
    ]

    impl.sendTireIdFeedback(options: options) { _ in
      expectation.fulfill()
    }

    waitForExpectations(timeout: 2)
    XCTAssertEqual(fakeRuntime.lastTireIdUuid, "tire-uuid")
    XCTAssertEqual(fakeRuntime.lastTireIdText, "TIRE-123")
  }

  func testSendTreadDepthResultFeedbackForwardsRegions() {
    let expectation = expectation(description: "sendTreadDepthResultFeedback completes")
    let region1: NSDictionary = ["available": true, "value_mm": NSNumber(value: 5.5)]
    let region2: NSDictionary = ["available": false, "value_mm": NSNumber(value: 0.0)]
    let options: NSDictionary = [
      "measurementUUID": "result-uuid-456",
      "treadResultRegions": [region1, region2],
    ]

    impl.sendTreadDepthResultFeedback(options: options) { _ in
      expectation.fulfill()
    }

    waitForExpectations(timeout: 2)
    XCTAssertEqual(fakeRuntime.lastTreadDepthResultUuid, "result-uuid-456")
    XCTAssertEqual(fakeRuntime.lastTreadDepthRegions?.count, 2)
    XCTAssertEqual(fakeRuntime.lastTreadDepthRegions?[0].isAvailable, true)
    XCTAssertEqual(fakeRuntime.lastTreadDepthRegions?[0].valueMm ?? 0.0, 5.5, accuracy: 0.001)
  }

  func testResultErrResolvesWithOkFalse() {
    fakeRuntime.nextResult = makeErrorSdkResult()

    var resolved: Any?
    let options: NSDictionary = ["measurementUUID": "err-uuid"]

    impl.getResult(options: options) { result in
      resolved = result
    }
    let map = resolved as? NSDictionary
    XCTAssertEqual(map?["ok"] as? Bool, false)
    XCTAssertNotNil((map?["error"] as? NSDictionary)?["code"] as? String)
  }

  func testScanAlreadyRunningReturnsError() {
    let fakePresenter = FakePresenter()
    impl.presenter = fakePresenter

    impl.scan(options: ["configJson": "{}"]) { _ in }

    var resolved: Any?
    impl.scan(options: ["configJson": "{}"]) { result in
      resolved = result
    }

    let map = resolved as? NSDictionary
    XCTAssertEqual((map?["error"] as? NSDictionary)?["code"] as? String, "ALREADY_RUNNING")
    XCTAssertTrue(outcomeKeys(in: map).isSubset(of: ["kind", "measurementUUID", "error"]))
  }

  func testScanCompletionResolvesOnlyOnceIfSdkCallbackRepeats() {
    let fakePresenter = FakePresenter()
    impl.presenter = fakePresenter

    var results: [NSDictionary] = []
    impl.scan(options: ["configJson": "{}"]) { result in
      if let map = result as? NSDictionary {
        results.append(map)
      }
    }

    let completion = fakeScanner.pendingScanCompletion
    XCTAssertNotNil(completion)

    completion?(AbortedOutcome(measurementUUID: "measurement-1"))
    completion?(AbortedOutcome(measurementUUID: "measurement-2"))

    XCTAssertEqual(results.count, 1)
    XCTAssertEqual(results.first?["measurementUUID"] as? String, "measurement-1")
    XCTAssertTrue(outcomeKeys(in: results.first).isSubset(of: ["kind", "measurementUUID", "error"]))
  }

  func testScanWithoutConfigJsonPassesNil() {
    let fakePresenter = FakePresenter()
    impl.presenter = fakePresenter

    impl.scan(options: [:]) { _ in }

    XCTAssertEqual(fakeScanner.scanCallCount, 1)
    XCTAssertNil(fakeScanner.lastScanConfigJson)
  }

  func testGetSdkVersionReturnsScannerVersion() {
    XCTAssertEqual(impl.getSdkVersion(), "15.0.1")
  }

  func testSetTestingConfigSerializesPayloadAndResolves() {
    var resolved: Any?
    let options: NSDictionary = [
      "autostart": true,
      "distance": NSNumber(value: 123.4),
    ]

    impl.setTestingConfig(options: options) { result in
      resolved = result
    }

    XCTAssertNotNil(resolved)
    XCTAssertTrue(resolved is NSNull)
    XCTAssertEqual(fakeTestingBridge.lastSetJson?.contains("\"autostart\":true"), true)
    XCTAssertEqual(fakeTestingBridge.lastSetJson?.contains("\"distance\":123.4"), true)
  }

  func testClearTestingConfigDelegatesAndResolves() {
    var resolved: Any?

    impl.clearTestingConfig { result in
      resolved = result
    }

    XCTAssertNotNil(resolved)
    XCTAssertTrue(resolved is NSNull)
    XCTAssertEqual(fakeTestingBridge.clearCount, 1)
  }

  func testGetWrapperVersionReturnsInjectedVersion() {
    XCTAssertEqual(impl.getWrapperVersion(), "1.0.0-test")
  }
}

private final class FakePresenter: TTRPresenter {
  func presentedViewController() -> UIViewController? {
    UIViewController()
  }
}

private func outcomeKeys(in map: NSDictionary?) -> Set<String> {
  Set((map?.allKeys as? [String]) ?? [])
}
