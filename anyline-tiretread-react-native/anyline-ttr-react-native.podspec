require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

# Bundled SDK pin. Updated together at release time.
anyline_ttr_sdk_version  = '16.2.0'
anyline_ttr_sdk_checksum = '7c679ec955b072afc68a547820c9f3710195b182b83786163183b64bc683a263'

Pod::Spec.new do |s|
  s.name         = "anyline-ttr-react-native"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => "15.0" }
  s.source       = { :git => "https://github.com/Anyline/anyline-tiretread-react-native.git", :tag => "#{s.version}" }
  s.module_name  = "AnylineTtrMobileWrapperReactNative"

  s.source_files = "ios/**/*.{h,m,mm,swift}"
  s.public_header_files = "ios/*.h"
  s.exclude_files = "ios/Tests/**"
  s.pod_target_xcconfig = { 'DEFINES_MODULE' => 'YES' }

  s.dependency "React-Core"

  # The SDK xcframework is downloaded and checksum-verified at `pod install`.
  s.vendored_frameworks = 'AnylineTireTreadSdk.xcframework'
  s.preserve_paths      = 'fetch_anyline_sdk.sh'
  s.prepare_command     = "sh fetch_anyline_sdk.sh #{anyline_ttr_sdk_version} #{anyline_ttr_sdk_checksum}"

end
