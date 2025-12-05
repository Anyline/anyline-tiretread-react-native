import AnylineTireTreadSdk

@objc(AnylineTtrMobileWrapperReactNative)
class AnylineTtrMobileWrapperReactNative: RCTEventEmitter {

    static var sharedInstance: AnylineTtrMobileWrapperReactNative?

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

    @objc(initTireTread:withResolver:withRejecter:)
    func initTireTread(licenseKey: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
        DispatchQueue.main.async {
            do {
                try AnylineTireTreadSdk.shared.doInit(licenseKey: licenseKey)
                resolve("Initialization successful")
            } catch {
                let (code, message) = ErrorExtractor.extract(from: error)
                reject(code, message, nil)
            }
        }
    }

    @objc(startTireTreadScanActivity:tireWidth:withResolver:withRejecter:)
    func startTireTreadScanActivity(config: String, tireWidth: Int, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        DispatchQueue.main.sync {
            guard let currentViewController = RCTPresentedViewController() else {
                reject(ErrorCode.NO_ACTIVITY, "Activity does not exist", nil)
                return
            }

            let viewController = ScanViewController()

            viewController.onResultError = { error in
                let code = error.userInfo["errorCode"] as? String ?? ErrorCode.UNKNOWN
                reject(code, error.localizedDescription, nil)
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
                try AnylineTireTreadSdk.shared.getTreadDepthReportResult(measurementUuid: measurementUuid, timeoutSeconds: 30, onResponse: { response in
                    switch(response) {
                    case let response as ResponseSuccess<TreadDepthResult>:
                        resolve(response.data.toJson())
                    case let response as ResponseError<TreadDepthResult>:
                        let code = response.errorCode ?? ErrorCode.UNKNOWN
                        let message = response.errorMessage ?? "Unknown error occurred"
                        reject(code, message, nil)
                    case let response as ResponseException<TreadDepthResult>:
                        let (code, message) = ErrorExtractor.extract(from: response.exception)
                        reject(code, message, nil)
                    default:
                        reject(ErrorCode.UNKNOWN, "Unexpected response type", nil)
                    }
                })
            } catch {
                let (code, message) = ErrorExtractor.extract(from: error)
                reject(code, message, nil)
            }
        }
    }

    @objc(getHeatMap:withResolver:withRejecter:)
    func getHeatMap(measurementUuid: String, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
        DispatchQueue.global(qos: .background).async {
            do {
                try AnylineTireTreadSdk.shared.getHeatmap(measurementUuid: measurementUuid, timeoutSeconds: 30, onResponse: { response in
                    switch(response) {
                    case let response as ResponseSuccess<Heatmap>:
                        resolve(response.data.url)
                    case let response as ResponseError<Heatmap>:
                        let code = response.errorCode ?? ErrorCode.UNKNOWN
                        let message = response.errorMessage ?? "Unknown error"
                        reject(code, message, nil)
                    case let response as ResponseException<Heatmap>:
                        let (code, message) = ErrorExtractor.extract(from: response.exception)
                        reject(code, message, nil)
                    default:
                        reject(ErrorCode.UNKNOWN, "Unexpected response type", nil)
                    }
                })
            } catch {
                let (code, message) = ErrorExtractor.extract(from: error)
                reject(code, message, nil)
            }
        }
    }
}
