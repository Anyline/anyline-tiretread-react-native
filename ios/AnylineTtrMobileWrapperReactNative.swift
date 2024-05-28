import AnylineTireTreadSdk

@objc(AnylineTtrMobileWrapperReactNative)
class AnylineTtrMobileWrapperReactNative: NSObject {

    @objc(initTireTread:withResolver:withRejecter:)
    func initTireTread(licenseKey: String, resolve: @escaping RCTPromiseResolveBlock,reject: @escaping RCTPromiseRejectBlock) -> Void {
        DispatchQueue.main.async {
            
            guard let currentViewController = RCTPresentedViewController() else {
                reject("1005", "Activity does not exist", nil)
                return
            }
          
            do {
                try AnylineTireTreadSdk.companion.doInit(licenseKey: licenseKey, context: currentViewController)
                NSLog("Success")
                resolve("Initialization successful")
            } catch let error as NSError {
                reject(String(error.code), error.localizedDescription, error)
            }
        }
    }
    
    @objc(startTireTreadScanActivity:withResolver:withRejecter:)
    func startTireTreadScanActivity(config: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        DispatchQueue.main.sync {
            guard let currentViewController = RCTPresentedViewController() else {
                reject("1005", "Activity does not exist", nil)
                return
            }
            
            let viewController = ScanViewController()
            
            viewController.onResultError = { error in
                reject(String(error.code), error.localizedDescription, error)
            }
            
            viewController.onResultSuccess = { uuid in
                resolve(uuid)
            }
            
            viewController.config = config
            viewController.modalPresentationStyle = .fullScreen
            currentViewController.present(viewController, animated: true, completion: nil)
        }
    }
      
    @objc(getTreadDepthReportResult:withResolver:withRejecter:)
    func getTreadDepthReportResult(measurementUuid: String, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    
        do {
            try AnylineTireTreadSdk.companion.getTreadDepthReportResult(measurementUuid: measurementUuid, onGetTreadDepthReportResultSucceeded: { result in
                resolve(result.toJson())
            }, onGetTreadDepthReportResultFailed: { error in
                reject(error.errorCode, error.errorMessage, nil)
            }, timeoutSeconds: 30)
        } catch let error as NSError {
            reject(String(error.code), error.localizedDescription, error)
        }
    }
      
}
