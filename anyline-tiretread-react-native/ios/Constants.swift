import Foundation

/// Error codes for the React Native bridge.
struct ErrorCode {
    // License errors
    static let LICENSE_INVALID = "LICENSE_INVALID"
    static let LICENSE_FORBIDDEN = "LICENSE_FORBIDDEN"
    static let NO_CONNECTION = "NO_CONNECTION"

    // SDK state errors
    static let INVALID_UUID = "INVALID_UUID"
    static let SDK_NOT_INITIALIZED = "SDK_NOT_INITIALIZED"
    static let SDK_NOT_VERIFIED = "SDK_NOT_VERIFIED"
    static let SDK_ERROR = "SDK_ERROR"

    // Platform/device errors
    static let NO_ACTIVITY = "NO_ACTIVITY"
    static let PERMISSION_REQUIRED = "PERMISSION_REQUIRED"
    static let NO_CAMERA = "NO_CAMERA"
    static let CAMERA_ERROR = "CAMERA_ERROR"
    static let CONFIG_MISSING = "CONFIG_MISSING"

    // Scan errors
    static let UNKNOWN = "UNKNOWN_ERROR"
    static let SCAN_ABORTED = "SCAN_ABORTED"
    static let UPLOAD_ABORTED = "UPLOAD_ABORTED"
    static let UPLOAD_FAILED = "UPLOAD_FAILED"
    static let SETUP_FAILED = "SETUP_FAILED"
    static let SCAN_NOT_COMPLETED = "SCAN_NOT_COMPLETED"
    static let CONFIG_ABORT = "CONFIG_ABORT"

    // Result errors
    static let MEASUREMENT_NOT_FOUND = "MEASUREMENT_NOT_FOUND"
    static let HEATMAP_NOT_AVAILABLE = "HEATMAP_NOT_AVAILABLE"

    // API errors
    static let NULL_FEEDBACK_API = "NULL_FEEDBACK_API"
    static let NULL_TREAD_DEPTH_API = "NULL_TREAD_DEPTH_API"
    static let SERVER_MEASUREMENT_ERROR = "SERVER_MEASUREMENT_ERROR"

    // Parsing errors
    static let INVALID_FRACTION = "INVALID_FRACTION"
    static let INVALID_INCH_STRING = "INVALID_INCH_STRING"

    // Exception wrapper
    static let EXCEPTION = "EXCEPTION"
}

/// iOS numeric codes for NSError (matching SDK's documented codes).
struct ScanErrorCode {
    static let DOMAIN = "TTRSCANDOMAIN"
    static let UNKNOWN = 1001
    static let SCAN_ABORTED = 1002
    static let UPLOAD_ABORTED = 1003
    static let UPLOAD_FAILED = 1004
    static let SETUP_FAILED = 1005
    static let NO_ACTIVITY = 1006
    static let CONFIG_ABORT = 1007
    static let PERMISSION_REQUIRED = 1008
    static let NO_CAMERA = 1009
    static let CAMERA_ERROR = 1010
}
