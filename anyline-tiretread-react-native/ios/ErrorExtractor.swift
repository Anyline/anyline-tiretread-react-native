import AnylineTireTreadSdk

/// Extracts error codes and messages from Kotlin exceptions thrown by the SDK.
/// Error codes match Android for cross-platform consistency.
struct ErrorExtractor {
    /// Extract error code and message from a Swift Error (wrapping a Kotlin exception)
    static func extract(from error: Error) -> (code: String, message: String) {
        let nsError = error as NSError
        if let kotlinException = nsError.userInfo["KotlinException"] as? KotlinThrowable {
            return extract(from: kotlinException)
        }
        return ("E_INITIALIZATION_FAILED", error.localizedDescription)
    }

    /// Extract error code and message from a KotlinThrowable directly
    static func extract(from exception: KotlinThrowable) -> (code: String, message: String) {
        switch exception {
        case let ex as SdkLicenseKeyInvalidException:
            return ("E_LICENSE_KEY_INVALID", ex.message ?? "Invalid license key")
        case let ex as SdkLicenseKeyForbiddenException:
            return ("E_LICENSE_KEY_INVALID", ex.message ?? "License key forbidden")
        case let ex as NoConnectionException:
            return ("E_INITIALIZATION_FAILED", ex.message ?? "No connection")
        default:
            return ("E_INITIALIZATION_FAILED", exception.message ?? "SDK error")
        }
    }
}
