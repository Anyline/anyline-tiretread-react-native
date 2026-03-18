import {
  withInfoPlist,
  withAndroidManifest,
  withProjectBuildGradle,
  createRunOncePlugin,
  type ConfigPlugin,
} from '@expo/config-plugins';
import path from 'path';

const pkg = require(path.resolve(__dirname, '..', '..', '..', 'package.json'));

const ANYLINE_MAVEN_URL =
  'https://europe-maven.pkg.dev/anyline-ttr-sdk/maven';

type AnylineTtrPluginProps = {
  cameraPermissionText?: string;
};

const withAnylineTtrIOS: ConfigPlugin<AnylineTtrPluginProps> = (
  config,
  {
    cameraPermissionText = 'This app requires camera access to scan tire treads.',
  } = {}
) => {
  return withInfoPlist(config, (c) => {
    c.modResults.NSCameraUsageDescription =
      c.modResults.NSCameraUsageDescription || cameraPermissionText;
    return c;
  });
};

const withAnylineTtrAndroid: ConfigPlugin = (config) => {
  config = withAndroidManifest(config, (c) => {
    const manifest = c.modResults.manifest;

    if (!manifest['uses-permission']) {
      manifest['uses-permission'] = [];
    }

    const hasCamera = manifest['uses-permission'].some(
      (p) => p.$?.['android:name'] === 'android.permission.CAMERA'
    );

    if (!hasCamera) {
      manifest['uses-permission'].push({
        $: { 'android:name': 'android.permission.CAMERA' },
      });
    }

    return c;
  });

  config = withProjectBuildGradle(config, (c) => {
    if (c.modResults.language !== 'groovy') {
      return c;
    }

    const contents = c.modResults.contents;
    if (contents.includes(ANYLINE_MAVEN_URL)) {
      return c;
    }

    const mavenLine = `        maven { url "${ANYLINE_MAVEN_URL}" }`;
    const pattern = /(allprojects\s*\{[\s\S]*?repositories\s*\{)/m;

    if (pattern.test(contents)) {
      c.modResults.contents = contents.replace(pattern, `$1\n${mavenLine}`);
    } else {
      c.modResults.contents =
        contents +
        `\nallprojects {\n    repositories {\n${mavenLine}\n    }\n}\n`;
    }

    return c;
  });

  return config;
};

const withAnylineTtr: ConfigPlugin<AnylineTtrPluginProps | void> = (
  config,
  props = {}
) => {
  config = withAnylineTtrIOS(config, props || {});
  config = withAnylineTtrAndroid(config);
  return config;
};

export default createRunOncePlugin(withAnylineTtr, pkg.name, pkg.version);
