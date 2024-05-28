//
//  VolumeButtonObserver.swift
//  anyline-ttr-mobile-wrapper-react-native
//
//  Created by Daniel Albertini on 30.04.24.
//

import AVFoundation

class VolumeButtonObserver {
    
    var onVolumeButtonPressed: (() -> Void)?

    deinit {
        NotificationCenter.default.removeObserver(self)
    }

    init() {
        // This class' deinit has a call to deregister itself as the
        // observer for this event.
        NotificationCenter.default
            .addObserver(self,
                         selector: #selector(volChanged(_:)),
                         name: NSNotification.Name(rawValue: "SystemVolumeDidChange"),
                         object: nil)
    }

    @objc func volChanged(_ notif: Notification) {
        if notif.userInfo?["Reason"] as? String == "ExplicitVolumeChange" {
            onVolumeButtonPressed?()
        }
    }
}

