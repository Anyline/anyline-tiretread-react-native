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

class ScanViewController: UIViewController, ScannerViewControllerHolder {

    // MARK: - Private Var's & Let's
    private var volumeButtonObserver: VolumeButtonObserver?

    var onResultSuccess: ((String) -> Void)?
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
    
    override var supportedInterfaceOrientations: UIInterfaceOrientationMask {
        return .landscape
    }

    override var shouldAutorotate: Bool {
        return true
    }

}

// MARK: - Private Actions
private extension ScanViewController {

    private func setupTireTreadScanView() {
        
        // creates a TireTreadScannerViewController. You can later refer to it here
        // as self.scannerViewController.
        TireTreadScanViewKt.TireTreadScanView(context: UIViewController(), config: config!, callback: self) { [weak self] error in
            if let onResultError = self?.onResultError {
                onResultError(error as! NSError)
            }
            
            print("Initialization failed: \(error)")
            self?.dismiss(animated: true)
        }

        self.dismissViewController = { [weak self] in
            self?.dismiss(animated: true)
        }
        addScanViewControllerAsChild()
    }

    private func addScanViewControllerAsChild() {
        guard let scannerViewController = scannerViewController else {
            if let onResultError = self.onResultError {
                onResultError(NSError(domain: "TTRSCANDOMAIN", code: 1001, userInfo: [NSLocalizedDescriptionKey : "Unknown error occured."]))
            }
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
                if (TireTreadScanner.companion.instance.captureDistanceStatus == DistanceStatus.ok)
                {
                    TireTreadScanner.companion.instance.startScanning()
                }
                else {
                    // Notify user to move the phone to the correct position before starting
                    print("Move the phone to the correct position before starting")
                }
            }
        }
    }

}

extension ScanViewController: TireTreadScanViewCallback {
    
    // We're using the SDK's defaultUi, so we only really need to implement the behavior
    // for the "onScanAbort", "onUploadCompleted", "onUploadAborted", and "onUploadFailed" callbacks

    func onScanAbort(uuid: String?) {
        if let onResultError = self.onResultError {
            onResultError(NSError(domain: "TTRSCANDOMAIN", code: 1002, userInfo: [NSLocalizedDescriptionKey : "Scan was aborted by the user."]))
        }
        self.dismiss(animated: true)
    }
    
    func onUploadAborted(uuid: String?) {
        if let onResultError = self.onResultError {
            onResultError(NSError(domain: "TTRSCANDOMAIN", code: 1003, userInfo: [NSLocalizedDescriptionKey : "The upload was aborted."]))
        }
        self.dismiss(animated: true)
    }
    
    func onUploadFailed(uuid: String?, exception: KotlinException) {
        if let onResultError = self.onResultError {
            onResultError(NSError(domain: "TTRSCANDOMAIN", code: 1004, userInfo: [NSLocalizedDescriptionKey : exception.description()]))
        }
        self.dismiss(animated: true)
    }
    
    func onUploadCompleted(uuid: String?) {
        // On upload complete, we should check for Results.
        
        // the "shouldRequestTireIdFeedback" is only intended for feedback and
        // does not need to be implemented
        if let uuid = uuid {
            if let onResultSuccess = self.onResultSuccess {
                onResultSuccess(uuid)
            }
        } else {
            if let onResultError = self.onResultError {
                onResultError(NSError(domain: "TTRSCANDOMAIN", code: 1001, userInfo: [NSLocalizedDescriptionKey : "Unknown error occured."]))
            }
        }
        self.dismiss(animated: true)
    }
    
    func onFocusFound(uuid: String?) {
    }
    
    func onScanStart(uuid: String?) {
    }
    
    func onScanStop(uuid: String?) {
        print("Showcase iOS: Scan stopped for uuid: \(uuid ?? "unknown")")
    }
    
    func onImageUploaded(uuid: String?, uploaded: Int32, total: Int32) {
        print("Showcase iOS: Image uploaded (\(uploaded)/\(total)) for uuid: \(uuid ?? "unknown")")
    }

    /// Called when the distance has changed.
    ///
    /// - Parameters:
    ///   - uuid: The UUID associated with the distance change.
    ///   - previousStatus: The previous distance status.
    ///   - newStatus: The new distance status.
    ///   - previousDistance: The previous distance value.
    ///   - newDistance: The new distance value.
    ///
    /// Note: The distance values are provided in millimeters if the metric system is selected (`UserDefaultsManager.shared.imperialSystem = false`), and in inches if the imperial system is selected (`UserDefaultsManager.shared.imperialSystem = true`).
    func onDistanceChanged(uuid: String?, previousStatus: DistanceStatus, newStatus: DistanceStatus, previousDistance: Float, newDistance: Float) {
        
    }
}

