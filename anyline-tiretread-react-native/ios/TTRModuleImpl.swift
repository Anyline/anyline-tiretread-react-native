import AnylineTireTreadSdk
import UIKit

protocol TTRRuntimeProtocol {
  var sdkVersion: String { get }

  func initialize(
    licenseKey: String,
    options: InitOptions,
    onComplete: @escaping (SdkResult<KotlinUnit>) -> Void
  )

  func getResult(
    measurementUUID: String,
    timeoutSeconds: Int32?,
    onComplete: @escaping (SdkResult<TreadDepthResult>) -> Void
  )

  func getHeatmap(
    measurementUUID: String,
    timeoutSeconds: Int32?,
    onComplete: @escaping (SdkResult<Heatmap>) -> Void
  )

  func sendCommentFeedback(
    measurementUUID: String,
    comment: String,
    onComplete: @escaping (SdkResult<MeasurementInfo>) -> Void
  )

  func sendTreadDepthResultFeedback(
    measurementUUID: String,
    treadResultRegions: [TreadResultRegion],
    onComplete: @escaping (SdkResult<MeasurementInfo>) -> Void
  )

  func sendTireIdFeedback(
    measurementUUID: String,
    tireId: String,
    onComplete: @escaping (SdkResult<MeasurementInfo>) -> Void
  )
}

extension AnylineTireTread: TTRRuntimeProtocol {
  func getResult(
    measurementUUID: String,
    timeoutSeconds: Int32?,
    onComplete: @escaping (SdkResult<TreadDepthResult>) -> Void
  ) {
    getResult(measurementUUID: measurementUUID, timeoutSeconds: timeoutSeconds ?? 60, onComplete: onComplete)
  }

  func getHeatmap(
    measurementUUID: String,
    timeoutSeconds: Int32?,
    onComplete: @escaping (SdkResult<Heatmap>) -> Void
  ) {
    getHeatmap(measurementUUID: measurementUUID, timeoutSeconds: timeoutSeconds ?? 60, onComplete: onComplete)
  }
}

protocol TTRScannerProtocol {
  func scan(
    from: UIViewController,
    configJson: String?,
    optionsJson: String?,
    completion: @escaping @Sendable (ScanOutcome) -> Void
  )
}

extension AnylineTireTreadScanner: TTRScannerProtocol {}

protocol TTRPresenter: AnyObject {
  func presentedViewController() -> UIViewController?
}

protocol TTRTestingBridgeProtocol {
  func setTestingConfig(json: String)
  func clearTestingConfig()
}

final class DefaultTestingBridge: TTRTestingBridgeProtocol {
  func setTestingConfig(json: String) {
    AnylineTireTreadSdk.shared.setTestingConfig(json: json)
  }

  func clearTestingConfig() {
    AnylineTireTreadSdk.shared.clearTestingConfig()
  }
}

protocol TTRWrapperVersionProviding {
  func currentVersion() -> String
}

final class BundleWrapperVersionProvider: TTRWrapperVersionProviding {
  func currentVersion() -> String {
    let bundle = Bundle(for: TTRModuleImpl.self)
    let version = bundle.object(forInfoDictionaryKey: "CFBundleShortVersionString") as? String
    return version?.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty == false
      ? version!
      : "0.0.0"
  }
}

class TTRModuleImpl {
  var runtime: TTRRuntimeProtocol
  var scanner: TTRScannerProtocol
  private let testingBridge: TTRTestingBridgeProtocol
  private let wrapperVersionProvider: TTRWrapperVersionProviding
  private var scanCompletion: ((Any) -> Void)?
  weak var presenter: TTRPresenter?

  init(
    runtime: TTRRuntimeProtocol? = nil,
    scanner: TTRScannerProtocol? = nil,
    testingBridge: TTRTestingBridgeProtocol = DefaultTestingBridge(),
    wrapperVersionProvider: TTRWrapperVersionProviding = BundleWrapperVersionProvider(),
    presenter: TTRPresenter? = nil
  ) {
    self.runtime = runtime ?? AnylineTireTread.shared
    self.scanner = scanner ?? AnylineTireTreadScanner()
    self.testingBridge = testingBridge
    self.wrapperVersionProvider = wrapperVersionProvider
    self.presenter = presenter
  }

  func initialize(options: NSDictionary, completion: @escaping (Any) -> Void) {
    let licenseKey = (options["licenseKey"] as? String)?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
    let customTag: String? = {
      let raw = (options["customTag"] as? String)?.trimmingCharacters(in: .whitespacesAndNewlines)
      return (raw?.isEmpty == false) ? raw : nil
    }()

    runtime.initialize(
      licenseKey: licenseKey,
      options: InitOptions(
        customTag: customTag,
        wrapperInfo: WrapperInfo.ReactNative(version: wrapperVersionProvider.currentVersion())
      )
    ) { sdkResult in
      let bridged = Bridge.shared.unit(sdkResult: sdkResult)
      ttrDebugLog("TTRModuleImpl.initialize completed bridgedType=\(String(describing: type(of: bridged)))")
      completion(bridged)
    }
  }

  func scan(options: NSDictionary, completion: @escaping (Any) -> Void) {
    ttrDebugLog("TTRModuleImpl.scan start")
    if scanCompletion != nil {
      ttrDebugLog("TTRModuleImpl.scan already-running short-circuit")
      let error = SdkError(
        code: .alreadyRunning,
        type: ErrorType.companion.fromCode(code: .alreadyRunning),
        message: "Another scan is already running.",
        debug: nil
      )
      completion(sanitizedOutcomeMap(FailedOutcome(measurementUUID: nil, error: error)))
      return
    }

    let configJson = options["configJson"] as? String

    guard let vc = presenter?.presentedViewController() else {
      ttrDebugLog("TTRModuleImpl.scan missing presenter view controller")
      let error = SdkError(
        code: .invalidArgument,
        type: ErrorType.companion.fromCode(code: .invalidArgument),
        message: "Cannot start scan because no active iOS view controller is available. Call scan only after the React Native screen is mounted and the app is in the foreground.",
        debug: nil
      )
      completion(sanitizedOutcomeMap(FailedOutcome(measurementUUID: nil, error: error)))
      return
    }

    let optionsJson = options["optionsJson"] as? String
    ttrDebugLog("TTRModuleImpl.scan presenter=\(String(describing: type(of: vc))) configBytes=\(configJson?.count ?? 0) optionsBytes=\(optionsJson?.count ?? 0)")
    scanCompletion = completion

    scanner.scan(from: vc, configJson: configJson, optionsJson: optionsJson) { [self] outcome in
      ttrDebugLog("TTRModuleImpl.scan callback outcome=\(String(describing: type(of: outcome))) raw=\(outcome.toMap())")
      guard let completion = consumeScanCompletion() else { return }
      ttrDebugLog("TTRModuleImpl.scan consuming completion")
      completion(sanitizedOutcomeMap(outcome))
    }
  }

  func getResult(options: NSDictionary, completion: @escaping (Any) -> Void) {
    let measurementUUID = (options["measurementUUID"] as? String)?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
    let timeoutSeconds = (options["timeoutSeconds"] as? NSNumber)?.int32Value

    runtime.getResult(measurementUUID: measurementUUID, timeoutSeconds: timeoutSeconds) { sdkResult in
      let bridged = Bridge.shared.result(sdkResult: sdkResult)
      ttrDebugLog("TTRModuleImpl.getResult completed uuid=\(measurementUUID) bridgedType=\(String(describing: type(of: bridged)))")
      completion(bridged)
    }
  }

  func getHeatmap(options: NSDictionary, completion: @escaping (Any) -> Void) {
    let measurementUUID = (options["measurementUUID"] as? String)?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
    let timeoutSeconds = (options["timeoutSeconds"] as? NSNumber)?.int32Value

    runtime.getHeatmap(measurementUUID: measurementUUID, timeoutSeconds: timeoutSeconds) { sdkResult in
      let bridged = Bridge.shared.heatmap(sdkResult: sdkResult)
      ttrDebugLog("TTRModuleImpl.getHeatmap completed uuid=\(measurementUUID) bridgedType=\(String(describing: type(of: bridged)))")
      completion(bridged)
    }
  }

  func setTestingConfig(options: NSDictionary, completion: @escaping (Any) -> Void) {
    ttrDebugLog("setTestingConfig start \(Self.testingConfigSummary(options))")
    testingBridge.setTestingConfig(json: Self.jsonString(from: options))
    ttrDebugLog("setTestingConfig completed")
    completion(NSNull())
  }

  func clearTestingConfig(completion: @escaping (Any) -> Void) {
    ttrDebugLog("clearTestingConfig start")
    testingBridge.clearTestingConfig()
    ttrDebugLog("clearTestingConfig completed")
    completion(NSNull())
  }

  func sendCommentFeedback(options: NSDictionary, completion: @escaping (Any) -> Void) {
    let measurementUUID = (options["measurementUUID"] as? String)?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
    let comment = (options["comment"] as? String)?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""

    runtime.sendCommentFeedback(measurementUUID: measurementUUID, comment: comment) { sdkResult in
      completion(Bridge.shared.measurementInfo(sdkResult: sdkResult))
    }
  }

  func sendTreadDepthResultFeedback(options: NSDictionary, completion: @escaping (Any) -> Void) {
    let measurementUUID = (options["measurementUUID"] as? String)?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
    let rawRegions = options["treadResultRegions"] as? [NSDictionary] ?? []
    let regions: [TreadResultRegion] = rawRegions.map { region in
      let available = (region["available"] as? Bool) ?? false
      let valueMm = (region["value_mm"] as? NSNumber)?.doubleValue ?? 0.0
      return TreadResultRegion.companion.doInitMm(isAvailable: available, value: valueMm)
    }

    runtime.sendTreadDepthResultFeedback(measurementUUID: measurementUUID, treadResultRegions: regions) { sdkResult in
      completion(Bridge.shared.measurementInfo(sdkResult: sdkResult))
    }
  }

  func sendTireIdFeedback(options: NSDictionary, completion: @escaping (Any) -> Void) {
    let measurementUUID = (options["measurementUUID"] as? String)?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
    let tireId = (options["tireId"] as? String)?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""

    runtime.sendTireIdFeedback(measurementUUID: measurementUUID, tireId: tireId) { sdkResult in
      completion(Bridge.shared.measurementInfo(sdkResult: sdkResult))
    }
  }

  func getSdkVersion() -> String {
    runtime.sdkVersion
  }

  func getWrapperVersion() -> String {
    wrapperVersionProvider.currentVersion()
  }

  private func consumeScanCompletion() -> ((Any) -> Void)? {
    let completion = scanCompletion
    scanCompletion = nil
    return completion
  }

  private func sanitizedOutcomeMap(_ outcome: ScanOutcome) -> Any {
    let rawValue = outcome.toMap()
    if let map = rawValue as? [String: Any?] {
      return Self.allowedOutcomeKeys.reduce(into: [String: Any?]()) { partial, key in
        if map.keys.contains(key) {
          partial[key] = map[key] ?? nil
        }
      }
    }
    if let map = rawValue as? NSDictionary {
      let filtered = NSMutableDictionary()
      for key in Self.allowedOutcomeKeys {
        if let value = map[key] {
          filtered[key] = value
        }
      }
      return filtered
    }
    return rawValue
  }

  private static let allowedOutcomeKeys: Set<String> = ["kind", "measurementUUID", "error"]

  private static func testingConfigSummary(_ options: NSDictionary) -> String {
    let frameCount = (options["framePaths"] as? [Any])?.count ?? 0
    let distance = options["distanceMm"] ?? "nil"
    let autostart = options["autostart"] ?? "nil"
    let fault = options["fault"] as? NSDictionary
    let faultCode = fault?["code"] ?? "nil"
    let faultType = fault?["type"] ?? "nil"
    return "frameCount=\(frameCount) distanceMm=\(distance) autostart=\(autostart) faultCode=\(faultCode) faultType=\(faultType)"
  }

  private static func jsonString(from object: Any) -> String {
    guard JSONSerialization.isValidJSONObject(object),
      let data = try? JSONSerialization.data(withJSONObject: object, options: []),
      let json = String(data: data, encoding: .utf8)
    else {
      return "{}"
    }
    return json
  }
}
