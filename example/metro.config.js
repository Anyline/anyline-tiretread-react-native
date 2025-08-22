const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const path = require('path');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  watchFolders: [
    path.resolve(__dirname, '..', 'anyline-tiretread-react-native'),
  ],
  resolver: {
    alias: {
      'anyline-ttr-mobile-wrapper-react-native': path.resolve(__dirname, '..', 'anyline-tiretread-react-native'),
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
