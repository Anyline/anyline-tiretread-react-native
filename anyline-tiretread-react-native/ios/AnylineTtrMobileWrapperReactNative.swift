import AnylineTireTreadSdk
import Foundation
import UIKit

func ttrDebugLog(_ message: String) {
  NSLog("[TTR-RN][iOS] %@", message)
}

@objc(AnylineTtrPlugin)
public final class AnylineTtrPlugin: NSObject, TTRPresenter {
  private lazy var impl: TTRModuleImpl = {
    let impl = TTRModuleImpl()
    impl.presenter = self
    return impl
  }()

  public override init() {
    super.init()
    ttrDebugLog("plugin init")
    NotificationCenter.default.addObserver(
      self,
      selector: #selector(onDidBecomeActive),
      name: UIApplication.didBecomeActiveNotification,
      object: nil
    )
    NotificationCenter.default.addObserver(
      self,
      selector: #selector(onWillResignActive),
      name: UIApplication.willResignActiveNotification,
      object: nil
    )
    NotificationCenter.default.addObserver(
      self,
      selector: #selector(onDidEnterBackground),
      name: UIApplication.didEnterBackgroundNotification,
      object: nil
    )
    NotificationCenter.default.addObserver(
      self,
      selector: #selector(onWillEnterForeground),
      name: UIApplication.willEnterForegroundNotification,
      object: nil
    )
  }

  deinit {
    NotificationCenter.default.removeObserver(self)
    ttrDebugLog("plugin deinit")
  }

  // MARK: - TTRPresenter

  func presentedViewController() -> UIViewController? {
    let viewController = RCTPresentedViewController()
    let name = viewController.map { String(describing: type(of: $0)) } ?? "nil"
    let presented = viewController?.presentedViewController.map { String(describing: type(of: $0)) } ?? "nil"
    ttrDebugLog("presentedViewController current=\(name) presented=\(presented)")
    return viewController
  }

  // MARK: - Bridge Methods

  @objc
  private func onDidBecomeActive() {
    ttrDebugLog("UIApplication didBecomeActive")
  }

  @objc
  private func onWillResignActive() {
    ttrDebugLog("UIApplication willResignActive")
  }

  @objc
  private func onDidEnterBackground() {
    ttrDebugLog("UIApplication didEnterBackground")
  }

  @objc
  private func onWillEnterForeground() {
    ttrDebugLog("UIApplication willEnterForeground")
  }

  @objc(initializeWithOptions:resolver:rejecter:)
  public func initialize(
    options: NSDictionary,
    resolve: @escaping RCTPromiseResolveBlock,
    reject _: @escaping RCTPromiseRejectBlock
  ) {
    let license = (options["licenseKey"] as? String) ?? ""
    ttrDebugLog("initialize start licenseLength=\(license.count)")
    impl.initialize(options: options) { result in
      ttrDebugLog("initialize callback resultType=\(String(describing: type(of: result)))")
      self.resolveOnMain(resolve, result)
    }
  }

  @objc(scanWithOptions:resolver:rejecter:)
  public func scan(
    options: NSDictionary,
    resolve: @escaping RCTPromiseResolveBlock,
    reject _: @escaping RCTPromiseRejectBlock
  ) {
    let configJson = (options["configJson"] as? String) ?? ""
    let optionsJson = (options["optionsJson"] as? String) ?? ""
    ttrDebugLog("scan requested configBytes=\(configJson.count) optionsBytes=\(optionsJson.count)")
    DispatchQueue.main.async { [self] in
      ttrDebugLog("scan dispatch main")
      self.impl.scan(options: options) { result in
        ttrDebugLog("scan callback resultType=\(String(describing: type(of: result)))")
        self.resolveOnMain(resolve, result)
      }
    }
  }

  @objc(getResultWithOptions:resolver:rejecter:)
  public func getResult(
    options: NSDictionary,
    resolve: @escaping RCTPromiseResolveBlock,
    reject _: @escaping RCTPromiseRejectBlock
  ) {
    ttrDebugLog("getResult start uuid=\((options["measurementUUID"] as? String) ?? "nil")")
    impl.getResult(options: options) { result in
      ttrDebugLog("getResult callback resultType=\(String(describing: type(of: result)))")
      self.resolveOnMain(resolve, result)
    }
  }

  @objc(getHeatmapWithOptions:resolver:rejecter:)
  public func getHeatmap(
    options: NSDictionary,
    resolve: @escaping RCTPromiseResolveBlock,
    reject _: @escaping RCTPromiseRejectBlock
  ) {
    ttrDebugLog("getHeatmap start uuid=\((options["measurementUUID"] as? String) ?? "nil")")
    impl.getHeatmap(options: options) { result in
      ttrDebugLog("getHeatmap callback resultType=\(String(describing: type(of: result)))")
      self.resolveOnMain(resolve, result)
    }
  }

  @objc(setTestingConfigWithOptions:resolver:rejecter:)
  public func setTestingConfig(
    options: NSDictionary,
    resolve: @escaping RCTPromiseResolveBlock,
    reject _: @escaping RCTPromiseRejectBlock
  ) {
    impl.setTestingConfig(options: options) { result in
      self.resolveOnMain(resolve, result)
    }
  }

  @objc(clearTestingConfigWithResolver:rejecter:)
  public func clearTestingConfig(resolve: @escaping RCTPromiseResolveBlock, reject _: @escaping RCTPromiseRejectBlock) {
    impl.clearTestingConfig { result in
      self.resolveOnMain(resolve, result)
    }
  }

  @objc(sendCommentFeedbackWithOptions:resolver:rejecter:)
  public func sendCommentFeedback(
    options: NSDictionary,
    resolve: @escaping RCTPromiseResolveBlock,
    reject _: @escaping RCTPromiseRejectBlock
  ) {
    impl.sendCommentFeedback(options: options) { result in
      self.resolveOnMain(resolve, result)
    }
  }

  @objc(sendTreadDepthResultFeedbackWithOptions:resolver:rejecter:)
  public func sendTreadDepthResultFeedback(
    options: NSDictionary,
    resolve: @escaping RCTPromiseResolveBlock,
    reject _: @escaping RCTPromiseRejectBlock
  ) {
    impl.sendTreadDepthResultFeedback(options: options) { result in
      self.resolveOnMain(resolve, result)
    }
  }

  @objc(sendTireIdFeedbackWithOptions:resolver:rejecter:)
  public func sendTireIdFeedback(
    options: NSDictionary,
    resolve: @escaping RCTPromiseResolveBlock,
    reject _: @escaping RCTPromiseRejectBlock
  ) {
    impl.sendTireIdFeedback(options: options) { result in
      self.resolveOnMain(resolve, result)
    }
  }

  @objc(getSdkVersionWithResolver:rejecter:)
  public func getSdkVersion(resolve: @escaping RCTPromiseResolveBlock, reject _: @escaping RCTPromiseRejectBlock) {
    resolve(impl.getSdkVersion())
  }

  @objc(getWrapperVersionWithResolver:rejecter:)
  public func getWrapperVersion(resolve: @escaping RCTPromiseResolveBlock, reject _: @escaping RCTPromiseRejectBlock) {
    resolve(impl.getWrapperVersion())
  }

  // MARK: - Thread Safety

  /// SDK callbacks arrive on Kotlin's Dispatchers.IO thread.
  /// React Native requires resolve() on a known serial queue.
  /// This matches Android's resolveOnJs pattern.
  private func resolveOnMain(_ resolve: @escaping RCTPromiseResolveBlock, _ value: Any) {
    DispatchQueue.main.async {
      ttrDebugLog("resolveOnMain valueType=\(String(describing: type(of: value)))")
      resolve(value)
    }
  }
}
