import Foundation

/// Lightweight debug logger shared by the wrapper's iOS sources.
///
/// Kept free of React Native so the `TTRModuleImpl` unit-test module can compile
/// it without pulling in the RN bridge (see `Package.swift`).
func ttrDebugLog(_ message: String) {
  NSLog("[TTR-RN][iOS] %@", message)
}
