import Foundation
import AnylineTireTreadSdk

/// Extracts error codes and messages from SDK exceptions.
struct ErrorExtractor {

    /// Extract error code and message from a KotlinThrowable.
    static func extract(from exception: KotlinThrowable) -> (code: String, message: String) {
        switch exception {
        case is SdkLicenseKeyInvalidException:
            return (ErrorCode.LICENSE_INVALID, "Check your license key and try again.")
        case is SdkLicenseKeyForbiddenException:
            return (ErrorCode.LICENSE_FORBIDDEN, "The license key is invalid. Please contact your Anyline representative.")
        case is NoConnectionException:
            return (ErrorCode.NO_CONNECTION, "Unable to establish a connection. Check your internet access and try again.")
        case is InvalidUuidException:
            return (ErrorCode.INVALID_UUID, "The UUID is not valid.")
        case is SdkInstanceInvalidException:
            return (ErrorCode.SDK_NOT_INITIALIZED, "SDK is not initialized. Call initialize() first.")
        case is SdkIsNotVerifiedException:
            return (ErrorCode.SDK_NOT_VERIFIED, "SDK is not verified.")
        case is NullFeedbackApiException:
            return (ErrorCode.NULL_FEEDBACK_API, "Feedback API is not initialized yet.")
        case is NullTreadDepthApiException:
            return (ErrorCode.NULL_TREAD_DEPTH_API, "Tread Depth API is not initialized yet.")
        case is ServerMeasurementErrorException:
            return (ErrorCode.SERVER_MEASUREMENT_ERROR, exception.message ?? "Server measurement error.")
        case is ScanProcessNotCompletedException:
            return (ErrorCode.SCAN_NOT_COMPLETED, "The scan process was not completed. No result available.")
        case is FractionDenominatorLessThanOrEqualZeroException:
            return (ErrorCode.INVALID_FRACTION, "Invalid fraction: denominator must be greater than zero.")
        case is NotFractionStringException:
            return (ErrorCode.INVALID_FRACTION, "The value is not a valid fraction string.")
        case is NotInchStringException:
            return (ErrorCode.INVALID_INCH_STRING, "The value is not a valid inch string.")
        default:
            // Check for SdkErrorCodeException (carries typed ErrorCode from SDK)
            if let sdkErrorCodeException = extractSdkErrorCodeException(exception) {
                return sdkErrorCodeException
            }
            let message = exception.message ?? "Unknown SDK error"
            return (ErrorCode.SDK_ERROR, message)
        }
    }

    /// Try to extract code/message from SdkErrorCodeException using reflection.
    private static func extractSdkErrorCodeException(_ exception: KotlinThrowable) -> (code: String, message: String)? {
        let className = String(describing: type(of: exception))
        guard className.contains("SdkErrorCodeException") else { return nil }

        // Try to access errorCode property via reflection
        let mirror = Mirror(reflecting: exception)
        for child in mirror.children {
            if child.label == "errorCode" {
                let errorCodeMirror = Mirror(reflecting: child.value)
                var code: String?
                var message: String?
                for prop in errorCodeMirror.children {
                    if prop.label == "code", let c = prop.value as? String {
                        code = c
                    }
                    if prop.label == "message", let m = prop.value as? String {
                        message = m
                    }
                }
                if let code = code {
                    return (code, message ?? exception.message ?? "SDK error")
                }
            }
        }

        // Fallback: use exception message
        return (ErrorCode.SDK_ERROR, exception.message ?? "SDK error")
    }

    /// Extract error code and message from an Error.
    static func extract(from error: Error) -> (code: String, message: String) {
        let nsError = error as NSError

        if let kotlinException = nsError.userInfo["KotlinException"] as? KotlinThrowable {
            return extract(from: kotlinException)
        }

        let className = String(describing: type(of: error))
        return extractByClassName(className, fallbackMessage: error.localizedDescription)
    }

    /// Fallback mapping by class name when KotlinException is not in userInfo.
    private static func extractByClassName(_ className: String, fallbackMessage: String) -> (code: String, message: String) {
        if className.contains("SdkLicenseKeyInvalidException") {
            return (ErrorCode.LICENSE_INVALID, fallbackMessage)
        }
        if className.contains("SdkLicenseKeyForbiddenException") {
            return (ErrorCode.LICENSE_FORBIDDEN, fallbackMessage)
        }
        if className.contains("NoConnectionException") {
            return (ErrorCode.NO_CONNECTION, fallbackMessage)
        }
        if className.contains("InvalidUuidException") {
            return (ErrorCode.INVALID_UUID, fallbackMessage)
        }
        if className.contains("SdkInstanceInvalidException") || className.contains("SdkNotInitializedException") {
            return (ErrorCode.SDK_NOT_INITIALIZED, fallbackMessage)
        }
        if className.contains("SdkIsNotVerifiedException") || className.contains("SdkNotVerifiedException") {
            return (ErrorCode.SDK_NOT_VERIFIED, fallbackMessage)
        }
        if className.contains("NullFeedbackApiException") {
            return (ErrorCode.NULL_FEEDBACK_API, fallbackMessage)
        }
        if className.contains("NullTreadDepthApiException") {
            return (ErrorCode.NULL_TREAD_DEPTH_API, fallbackMessage)
        }
        if className.contains("ServerMeasurementErrorException") {
            return (ErrorCode.SERVER_MEASUREMENT_ERROR, fallbackMessage)
        }
        if className.contains("ScanProcessNotCompletedException") {
            return (ErrorCode.SCAN_NOT_COMPLETED, fallbackMessage)
        }
        if className.contains("FractionDenominatorLessThanOrEqualZeroException") || className.contains("NotFractionStringException") {
            return (ErrorCode.INVALID_FRACTION, fallbackMessage)
        }
        if className.contains("NotInchStringException") {
            return (ErrorCode.INVALID_INCH_STRING, fallbackMessage)
        }
        // SdkErrorCodeException - can't extract typed code from class name alone, but preserve the message
        if className.contains("SdkErrorCodeException") {
            return (ErrorCode.SDK_ERROR, fallbackMessage)
        }

        return (ErrorCode.SDK_ERROR, fallbackMessage)
    }

    /// Create an NSError with the given error code, numeric code, and message.
    static func toNSError(code: String, numericCode: Int, message: String) -> NSError {
        return NSError(domain: ScanErrorCode.DOMAIN, code: numericCode, userInfo: [
            NSLocalizedDescriptionKey: message,
            "errorCode": code
        ])
    }
}
