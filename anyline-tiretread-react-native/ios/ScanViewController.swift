//
//  ScanViewController.swift
//  anyline-ttr-mobile-wrapper-react-native
//
//  Created by Daniel Albertini on 30.04.24.
//

import UIKit
import AVFoundation
import CoreHaptics
import MediaPlayer
import AnylineTireTreadSdk

class ScanViewController: UIViewController {

    // MARK: - Private Var's & Let's
    private var volumeButtonObserver: VolumeButtonObserver?
    private var scanCameraDirection: CameraDirection = .unknown
    private var currentMeasurementUUID: String?

    var onResultSuccess: ((String, CameraDirection) -> Void)?
    var onResultError: ((NSError) -> Void)?

    var scannerViewController: UIViewController?
    var dismissViewController: (() -> Void)?

    var config: String?

    // MARK: - Init
    init() {
        super.init(nibName: nil, bundle: nil)
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    // MARK: - Life cycle
    override func viewDidLoad() {
        super.viewDidLoad()
        setupTireTreadScanView()
        setupVolumeView()
    }

    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        self.setupVolumeButtonObserver()
    }

    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        self.onResultError = nil
        self.onResultSuccess = nil
        self.resetVolumeButtonObserver()
        self.scannerViewController = nil
    }
}

// MARK: - Private Actions
private extension ScanViewController {

    private func setupTireTreadScanView() {
        guard let config = config, !config.isEmpty else {
            let nsError = ErrorExtractor.toNSError(code: ErrorCode.CONFIG_MISSING, numericCode: ScanErrorCode.CONFIG_MISSING, message: "Scan configuration is missing or empty.")
            onResultError?(nsError)
            self.dismiss(animated: true)
            return
        }

        self.scannerViewController = TireTreadScanViewKt.TireTreadScanView(
                        config: config,
                        onScanAborted: onScanAborted,
                        onScanProcessCompleted: onUploadCompleted,
                        callback: handleScanEvent
                    ) { measurementUUID, error in
                        let (code, message) = ErrorExtractor.extract(from: error)
                        let nsError = ErrorExtractor.toNSError(code: code, numericCode: ScanErrorCode.SETUP_FAILED, message: message)
                        self.onResultError?(nsError)
                        self.dismiss(animated: true)
                    }

        self.dismissViewController = { [weak self] in
            self?.dismiss(animated: true)
        }
        addScanViewControllerAsChild()
    }

    private func addScanViewControllerAsChild() {
        guard let scannerViewController = scannerViewController else {
            let nsError = ErrorExtractor.toNSError(code: ErrorCode.UNKNOWN, numericCode: ScanErrorCode.UNKNOWN, message: "Unknown error occurred.")
            onResultError?(nsError)
            self.dismiss(animated: true)
            return
        }
        addChild(scannerViewController)
        view.addSubview(scannerViewController.view)

        NSLayoutConstraint.activate([
            scannerViewController.view.topAnchor.constraint(equalTo: view.topAnchor),
            scannerViewController.view.bottomAnchor.constraint(equalTo: view.bottomAnchor),
            scannerViewController.view.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            scannerViewController.view.trailingAnchor.constraint(equalTo: view.trailingAnchor)
        ])

        scannerViewController.didMove(toParent: self)
    }

    func setupVolumeView() {
        let volumeView = MPVolumeView(frame: CGRect(x: -1000, y: -1000, width: 0, height: 0))
        view.addSubview(volumeView)
    }
}

// MARK: - AVAudioSession for Volume buttons
private extension ScanViewController {
    func setupVolumeButtonObserver() {
        volumeButtonObserver = VolumeButtonObserver()
        volumeButtonObserver?.onVolumeButtonPressed = { [weak self] in
            self?.handleVolumeButtonPressed()
        }
    }

    func resetVolumeButtonObserver() {
        self.volumeButtonObserver = nil
    }

    private func handleVolumeButtonPressed() {
        if TireTreadScanner.companion.isInitialized {
            if TireTreadScanner.companion.instance.isScanning {
                TireTreadScanner.companion.instance.stopScanning()
            } else {
                if (TireTreadScanner.companion.instance.captureDistanceStatus == DistanceStatus.ok) {
                    TireTreadScanner.companion.instance.startScanning()
                }
            }
        }
    }

    private func handleScanEvent(event: ScanEvent) {
        switch(event) {
            case let event as OnScanStarted:
                currentMeasurementUUID = event.measurementUUID
                scanCameraDirection = CameraDirectionHelper.getCameraDirection()

                let eventData: [String: Any] = [
                    "type": "scanStarted",
                    "measurementUUID": event.measurementUUID ?? "",
                    "cameraDirection": CameraDirectionHelper.cameraDirectionToString(scanCameraDirection)
                ]
                AnylineTtrMobileWrapperReactNative.sendEvent("TireTreadScanEvent", body: eventData)

            case _ as OnScanStopped:
                let eventData: [String: Any] = [
                    "type": "scanStopped",
                    "measurementUUID": currentMeasurementUUID ?? ""
                ]
                AnylineTtrMobileWrapperReactNative.sendEvent("TireTreadScanEvent", body: eventData)

            case let event as OnImageUploaded:
                let eventData: [String: Any] = [
                    "type": "imageUploaded",
                    "measurementUUID": currentMeasurementUUID ?? "",
                    "uploaded": event.uploaded,
                    "total": event.total
                ]
                AnylineTtrMobileWrapperReactNative.sendEvent("TireTreadScanEvent", body: eventData)

            default:
                break
        }
    }

    func onScanAborted(uuid: String?) {
        let nsError = ErrorExtractor.toNSError(code: ErrorCode.SCAN_ABORTED, numericCode: ScanErrorCode.SCAN_ABORTED, message: "Scan was aborted by the user.")
        onResultError?(nsError)
        self.dismiss(animated: true)
    }

    func onUploadAborted(uuid: String?) {
        let nsError = ErrorExtractor.toNSError(code: ErrorCode.UPLOAD_ABORTED, numericCode: ScanErrorCode.UPLOAD_ABORTED, message: "The upload was aborted.")
        onResultError?(nsError)
        self.dismiss(animated: true)
    }

    func onUploadFailed(uuid: String?, exception: KotlinException) {
        let (code, message) = ErrorExtractor.extract(from: exception)
        let nsError = ErrorExtractor.toNSError(code: code, numericCode: ScanErrorCode.UPLOAD_FAILED, message: message)
        onResultError?(nsError)
        self.dismiss(animated: true)
    }

    func onUploadCompleted(uuid: String?) {
        if let uuid = uuid {
            onResultSuccess?(uuid, scanCameraDirection)
        } else {
            let nsError = ErrorExtractor.toNSError(code: ErrorCode.UNKNOWN, numericCode: ScanErrorCode.UNKNOWN, message: "Unknown error occurred.")
            onResultError?(nsError)
        }
        self.dismiss(animated: true)
    }

    func onFocusFound(uuid: String?) {
    }

    func onScanStart(uuid: String?) {
    }

    func onScanStop(uuid: String?) {
    }

    func onImageUploaded(uuid: String?, uploaded: Int32, total: Int32) {
    }

    func onDistanceChanged(uuid: String?, previousStatus: DistanceStatus, newStatus: DistanceStatus, previousDistance: Float, newDistance: Float) {
    }
}
