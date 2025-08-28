//
//  ScanViewController.swift
//  anyline-ttr-mobile-wrapper-react-native
//
//  Created by Daniel Albertini on 30.04.24.
//

import UIKit
import AnylineTireTreadSdk

class ScanViewController: UIViewController {

    // MARK: - Private Var's & Let's

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
    }

    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
    }

    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        self.onResultError = nil
        self.onResultSuccess = nil
        self.scannerViewController = nil
    }
    

    override var shouldAutorotate: Bool {
        return true
    }

}

// MARK: - Private Actions
private extension ScanViewController {

    private func setupTireTreadScanView() {
        
        guard let config = config else {
            if let onResultError = self.onResultError {
                onResultError(NSError(domain: "TTRSCANDOMAIN", code: 1003, userInfo: [NSLocalizedDescriptionKey: "Configuration is missing"]))
            }
            self.dismiss(animated: true)
            return
        }
        
        self.scannerViewController = TireTreadScanViewKt.TireTreadScanView(
                        config: config,
                        onScanAborted: onScanAborted,
                        onScanProcessCompleted: onUploadCompleted,
                        callback: handleScanEvent
                    ) { measurementUUID, error in
                        let nsError = NSError(domain: "TTRSCANDOMAIN", code: 1001, userInfo: [NSLocalizedDescriptionKey: error.message ?? "Unknown error"])
                        self.onResultError?(nsError)
                        
                        print("Initialization failed: \(error)")
                        self.dismiss(animated: true)
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
        
        scannerViewController.view.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            scannerViewController.view.topAnchor.constraint(equalTo: view.topAnchor),
            scannerViewController.view.bottomAnchor.constraint(equalTo: view.bottomAnchor),
            scannerViewController.view.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            scannerViewController.view.trailingAnchor.constraint(equalTo: view.trailingAnchor)
        ])
        
        scannerViewController.didMove(toParent: self)
    }

    
    private func handleScanEvent(event: ScanEvent) {
        switch(event) {
                
            case let event as OnImageUploaded:
                print("onImageUploaded: \(event.total) images uploaded in total")
                break
                
            default:
                print("ScanEvent: \(event.description)")
                break
            }
    }
    
    func onScanAborted(uuid: String?) {
        if let onResultError = self.onResultError {
            onResultError(NSError(domain: "TTRSCANDOMAIN", code: 1002, userInfo: [NSLocalizedDescriptionKey : "Scan was aborted by the user."]))
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
    


}

