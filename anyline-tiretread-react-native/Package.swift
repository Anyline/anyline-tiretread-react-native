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
      url: "https://ttr-sdk-ios.anyline.io/stable/15.3.3/AnylineTireTreadSdk_spm_15.3.3.zip",
      checksum: "8932471bfdb57919df7272095e2dcc362fa12c0eea89a9abdabfbc0f10e37d32"
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
