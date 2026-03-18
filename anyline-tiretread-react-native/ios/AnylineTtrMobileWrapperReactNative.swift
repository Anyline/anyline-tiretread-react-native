import AnylineTireTreadSdk
import Foundation

@objc(AnylineTtrMobileWrapperReactNative)
class AnylineTtrMobileWrapperReactNative: NSObject, TTRPresenter {
  private lazy var impl: TTRModuleImpl = {
    let impl = TTRModuleImpl()
    impl.presenter = self
    return impl
  }()

  @objc
  class func requiresMainQueueSetup() -> Bool {
    return false
  }

  // MARK: - TTRPresenter

  func presentedViewController() -> UIViewController? {
    RCTPresentedViewController()
  }

  // MARK: - Bridge Methods

  @objc(initialize:withResolver:withRejecter:)
  func initialize(
    options: NSDictionary,
    resolve: @escaping RCTPromiseResolveBlock,
    reject _: @escaping RCTPromiseRejectBlock
  ) {
    impl.initialize(options: options) { result in
      self.resolveOnMain(resolve, result)
    }
  }

  @objc(scan:withResolver:withRejecter:)
  func scan(
    options: NSDictionary,
    resolve: @escaping RCTPromiseResolveBlock,
    reject _: @escaping RCTPromiseRejectBlock
  ) {
    DispatchQueue.main.async { [self] in
      self.impl.scan(options: options) { result in
        self.resolveOnMain(resolve, result)
      }
    }
  }

  @objc(getResult:withResolver:withRejecter:)
  func getResult(
    options: NSDictionary,
    resolve: @escaping RCTPromiseResolveBlock,
    reject _: @escaping RCTPromiseRejectBlock
  ) {
    impl.getResult(options: options) { result in
      self.resolveOnMain(resolve, result)
    }
  }

  @objc(getHeatmap:withResolver:withRejecter:)
  func getHeatmap(
    options: NSDictionary,
    resolve: @escaping RCTPromiseResolveBlock,
    reject _: @escaping RCTPromiseRejectBlock
  ) {
    impl.getHeatmap(options: options) { result in
      self.resolveOnMain(resolve, result)
    }
  }

  @objc(setTestingConfig:withResolver:withRejecter:)
  func setTestingConfig(
    options: NSDictionary,
    resolve: @escaping RCTPromiseResolveBlock,
    reject _: @escaping RCTPromiseRejectBlock
  ) {
    impl.setTestingConfig(options: options) { result in
      self.resolveOnMain(resolve, result)
    }
  }

  @objc(clearTestingConfig:withRejecter:)
  func clearTestingConfig(resolve: @escaping RCTPromiseResolveBlock, reject _: @escaping RCTPromiseRejectBlock) {
    impl.clearTestingConfig { result in
      self.resolveOnMain(resolve, result)
    }
  }

  @objc(sendCommentFeedback:withResolver:withRejecter:)
  func sendCommentFeedback(
    options: NSDictionary,
    resolve: @escaping RCTPromiseResolveBlock,
    reject _: @escaping RCTPromiseRejectBlock
  ) {
    impl.sendCommentFeedback(options: options) { result in
      self.resolveOnMain(resolve, result)
    }
  }

  @objc(sendTreadDepthResultFeedback:withResolver:withRejecter:)
  func sendTreadDepthResultFeedback(
    options: NSDictionary,
    resolve: @escaping RCTPromiseResolveBlock,
    reject _: @escaping RCTPromiseRejectBlock
  ) {
    impl.sendTreadDepthResultFeedback(options: options) { result in
      self.resolveOnMain(resolve, result)
    }
  }

  @objc(sendTireIdFeedback:withResolver:withRejecter:)
  func sendTireIdFeedback(
    options: NSDictionary,
    resolve: @escaping RCTPromiseResolveBlock,
    reject _: @escaping RCTPromiseRejectBlock
  ) {
    impl.sendTireIdFeedback(options: options) { result in
      self.resolveOnMain(resolve, result)
    }
  }

  @objc(getSdkVersion:withRejecter:)
  func getSdkVersion(resolve: @escaping RCTPromiseResolveBlock, reject _: @escaping RCTPromiseRejectBlock) {
    resolve(impl.getSdkVersion())
  }

  @objc(getWrapperVersion:withRejecter:)
  func getWrapperVersion(resolve: @escaping RCTPromiseResolveBlock, reject _: @escaping RCTPromiseRejectBlock) {
    resolve(impl.getWrapperVersion())
  }

  // MARK: - Thread Safety

  /// SDK callbacks arrive on Kotlin's Dispatchers.IO thread.
  /// React Native requires resolve() on a known serial queue.
  /// This matches Android's resolveOnJs pattern.
  private func resolveOnMain(_ resolve: @escaping RCTPromiseResolveBlock, _ value: Any) {
    DispatchQueue.main.async {
      resolve(value)
    }
  }
}
