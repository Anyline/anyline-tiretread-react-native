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
      url: "https://ttr-sdk-ios.anyline.io/stable/15.3.2/AnylineTireTreadSdk_spm_15.3.2.zip",
      checksum: "7844daf14376fdab1f6a4a6bf5ca0bf2b3afab1f2881e6642093bed2e33115d3"
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
