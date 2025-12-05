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
    static let CONFIG_MISSING = "CONFIG_MISSING"

    // Scan errors
    static let UNKNOWN = "UNKNOWN_ERROR"
    static let SCAN_ABORTED = "SCAN_ABORTED"
    static let UPLOAD_ABORTED = "UPLOAD_ABORTED"
    static let UPLOAD_FAILED = "UPLOAD_FAILED"
    static let SETUP_FAILED = "SETUP_FAILED"
    static let SCAN_NOT_COMPLETED = "SCAN_NOT_COMPLETED"

    // API errors
    static let NULL_FEEDBACK_API = "NULL_FEEDBACK_API"
    static let NULL_TREAD_DEPTH_API = "NULL_TREAD_DEPTH_API"
    static let SERVER_MEASUREMENT_ERROR = "SERVER_MEASUREMENT_ERROR"

    // Parsing errors
    static let INVALID_FRACTION = "INVALID_FRACTION"
    static let INVALID_INCH_STRING = "INVALID_INCH_STRING"
}

/// iOS numeric codes for NSError.
struct ScanErrorCode {
    static let DOMAIN = "TTR"
    static let UNKNOWN = 1001
    static let SCAN_ABORTED = 1002
    static let UPLOAD_ABORTED = 1003
    static let UPLOAD_FAILED = 1004
    static let SETUP_FAILED = 1005
    static let CONFIG_MISSING = 1006
}
