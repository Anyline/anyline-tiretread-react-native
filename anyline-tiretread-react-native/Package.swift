// swift-tools-version: 5.9
import PackageDescription

let package = Package(
  name: "TTRModuleImpl",
  platforms: [.iOS(.v14)],
  products: [
    .library(name: "TTRModuleImpl", targets: ["TTRModuleImpl"]),
  ],
  targets: [
    .binaryTarget(
      name: "AnylineTireTreadSdk",
      url: "https://ttr-sdk-ios.anyline.io/stable/15.3.0/AnylineTireTreadSdk_spm_15.3.0.zip",
      checksum: "1905e04ed54e67c20b664ac39ce7185637c6041d4b6edf7b3504bd41ddac90d4"
    ),
    .target(
      name: "TTRModuleImpl",
      dependencies: ["AnylineTireTreadSdk"],
      path: "ios",
      exclude: [
        "Tests",
        "AnylineTtrMobileWrapperReactNative.mm",
        "AnylineTtrMobileWrapperReactNative.swift",
        "AnylineTtrMobileWrapperReactNative.h",
        "AnylineTtrPlugin.h",
        "anyline_ttr_react_native.h",
        "AnylineTtrMobileWrapperReactNative-Bridging-Header.h",
      ],
      sources: ["TTRModuleImpl.swift", "TTRLog.swift"]
    ),
    .testTarget(
      name: "TTRModuleImplTests",
      dependencies: ["TTRModuleImpl"],
      path: "ios/Tests"
    ),
  ]
)
