import AnylineTireTreadSdk

@objc(AnylineTtrMobileWrapperReactNative)
class AnylineTtrMobileWrapperReactNative: NSObject {

    @objc(initTireTread:withResolver:withRejecter:)
    func initTireTread(licenseKey: String, resolve: @escaping RCTPromiseResolveBlock,reject: @escaping RCTPromiseRejectBlock) -> Void {
        DispatchQueue.main.async {
            do {
              try AnylineTireTreadSdk.shared.doInit(licenseKey: licenseKey)
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
          try AnylineTireTreadSdk.shared.getTreadDepthReportResult(measurementUuid: measurementUuid, timeoutSeconds: 30, onResponse: { [weak self] response in
              guard let self = self else { return }

              switch(response) {
                  case let response as ResponseSuccess<TreadDepthResult>:
                      resolve(response.data.toJson())
                      break;
                  case let response as ResponseError<TreadDepthResult>:
                      reject(response.errorCode, response.errorMessage, nil)
                      break;
                  case let response as ResponseException<TreadDepthResult>:
                      reject(nil, response.exception.description(), nil)
                      break;
                  default:
                      // This state cannot be reached
                      break;
              }
          })
        } catch let error as NSError {
            reject(String(error.code), error.localizedDescription, error)
        }
    }
      
}
