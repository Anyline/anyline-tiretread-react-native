require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "anyline-ttr-react-native"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => "13.4" }
  s.source       = { :git => "https://github.com/Anyline/anyline-tiretread-react-native.git", :tag => "#{s.version}" }
  s.module_name  = "AnylineTtrMobileWrapperReactNative"

  s.source_files = "ios/**/*.{h,m,mm,swift}"
  s.public_header_files = "ios/*.h"
  s.exclude_files = "ios/Tests/**"
  s.pod_target_xcconfig = { 'DEFINES_MODULE' => 'YES' }

  s.dependency "React-Core"

  s.dependency 'AnylineTireTreadSdk', '~> 15.0'

end
