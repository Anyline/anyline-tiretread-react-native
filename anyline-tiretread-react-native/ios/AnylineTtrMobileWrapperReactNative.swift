import AnylineTireTreadSdk

@objc(AnylineTtrMobileWrapperReactNative)
class AnylineTtrMobileWrapperReactNative: RCTEventEmitter {

    static var sharedInstance: AnylineTtrMobileWrapperReactNative?
    static var orientationLock: String = "none"

    override init() {
        super.init()
        AnylineTtrMobileWrapperReactNative.sharedInstance = self
    }

    override func supportedEvents() -> [String]! {
        return ["TireTreadScanEvent"]
    }

    @objc
    static func sendEvent(_ name: String, body: Any) {
        sharedInstance?.sendEvent(withName: name, body: body)
    }

    @objc(setOrientationLock:)
    func setOrientationLock(_ orientation: String) {
        AnylineTtrMobileWrapperReactNative.orientationLock = orientation
    }

    private func legacyScanErrorCode(for error: NSError) -> String {
        if error.domain != "TTRSCANDOMAIN" {
            return error.domain.isEmpty ? String(error.code) : error.domain
        }

        switch error.code {
        case 1002:
            return "SCAN_ABORT"
        case 1003, 1004:
            return "UPLOAD_FAILED"
        case 1005:
            return "UPLOAD_FAILED"
        default:
            return "UNKNOWN_ERROR"
        }
    }

    @objc(initTireTread:withResolver:withRejecter:)
    func initTireTread(licenseKey: String, resolve: @escaping RCTPromiseResolveBlock,reject: @escaping RCTPromiseRejectBlock) -> Void {
        DispatchQueue.main.async {
            do {
              try AnylineTireTreadSdk.shared.doInit(licenseKey: licenseKey)
                resolve("Initialization successful")
            } catch {
                let nsError = error as NSError
                reject(String(nsError.code), nsError.localizedDescription, nsError)
            }
        }
    }

    @objc(startTireTreadScanActivity:tireWidth:withResolver:withRejecter:)
    func startTireTreadScanActivity(config: String, tireWidth:Int, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        DispatchQueue.main.sync {
            guard let currentViewController = RCTPresentedViewController() else {
                reject("1005", "Activity does not exist", nil)
                return
            }
            
            let viewController = ScanViewController()
            
            viewController.onResultError = { [weak self] error in
                let mappedCode = self?.legacyScanErrorCode(for: error) ?? String(error.code)
                reject(mappedCode, error.localizedDescription, error)
            }
            
            viewController.onResultSuccess = { uuid, cameraDirection in
                let result: [String: Any] = [
                    "uuid": uuid,
                    "cameraDirection": CameraDirectionHelper.cameraDirectionToString(cameraDirection)
                ]
                resolve(result)
            }
            
            viewController.config = config
            viewController.modalPresentationStyle = .fullScreen
            currentViewController.present(viewController, animated: true, completion: nil)
        }
    }
      
    @objc(getTreadDepthReportResult:withResolver:withRejecter:)
    func getTreadDepthReportResult(measurementUuid: String, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
        DispatchQueue.global(qos: .background).async {
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
            } catch {
                let nsError = error as NSError
                reject(String(nsError.code), nsError.localizedDescription, nsError)
            }
        }
    }

    @objc(getHeatMap:withResolver:withRejecter:)
    func getHeatMap(measurementUuid: String, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    
        do {
          try AnylineTireTreadSdk.shared.getHeatmap(measurementUuid: measurementUuid, timeoutSeconds: 30, onResponse: { [weak self] response in
              guard let self = self else { return }

              switch(response) {
                  case let response as ResponseSuccess<Heatmap>:
                      resolve(response.data.url)
                      break;
                  case let response as ResponseError<Heatmap>:
                      let message = response.errorMessage ?? "Unknown error"
                      reject(response.errorCode, message, nil)
                      break;
                  case let response as ResponseException<Heatmap>:
                      let exceptionMessage = "Unable to get heatmap result: " + (response.exception.message ?? "Unknown exception")
                      reject("EXCEPTION", exceptionMessage, nil)
                      break;
                  default:
                      // This state cannot be reached
                      break;
              }
          })
        } catch {
            let nsError = error as NSError
            reject(String(nsError.code), nsError.localizedDescription, nsError)
        }
    }

}
