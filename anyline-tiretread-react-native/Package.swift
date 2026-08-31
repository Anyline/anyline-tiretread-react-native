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
      url: "https://ttr-sdk-ios.anyline.io/stable/15.5.0/AnylineTireTreadSdk_spm_15.5.0.zip",
      checksum: "16835a6b486db7bef1fc939042db072f5101b6b318eee2f67b1702068ea0ab22"
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
