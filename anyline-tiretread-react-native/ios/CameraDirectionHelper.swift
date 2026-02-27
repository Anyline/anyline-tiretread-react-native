//
//  CameraDirectionHelper.swift
//  anyline-ttr-react-native
//
//  Helper class to determine camera direction based on device orientation
//

import UIKit

enum CameraDirection {
    case left
    case right
    case unknown
}

class CameraDirectionHelper {
    /**
     * Get current camera direction based on interface orientation
     * Returns: .left when camera points left, .right when camera points right
     */
    static func getCameraDirection() -> CameraDirection {
        let orientation = UIApplication.shared.statusBarOrientation

        switch orientation {
        case .landscapeLeft:
            return .right  // Camera points right
        case .landscapeRight:
            return .left   // Camera points left
        default:
            return .unknown // Portrait or unknown
        }
    }

    /**
     * Convert CameraDirection to string for JavaScript bridge
     */
    static func cameraDirectionToString(_ direction: CameraDirection) -> String {
        switch direction {
        case .left:
            return "LEFT"
        case .right:
            return "RIGHT"
        case .unknown:
            return "UNKNOWN"
        }
    }
}