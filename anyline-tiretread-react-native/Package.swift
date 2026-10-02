// swift-tools-version: 5.9
import PackageDescription

let package = Package(
  name: "TTRModuleImpl",
  platforms: [.iOS(.v15)],
  products: [
    .library(name: "TTRModuleImpl", targets: ["TTRModuleImpl"]),
  ],
  targets: [
    .binaryTarget(
      name: "AnylineTireTreadSdk",
      url: "https://ttr-sdk-ios.anyline.io/stable/16.0.0/AnylineTireTreadSdk_spm_16.0.0.zip",
      checksum: "a6845a1f554c46001f1ce2feb5d172c989269ed42931c55583218badc912799c"
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
