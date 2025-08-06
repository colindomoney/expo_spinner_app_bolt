const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add support for Tamagui
config.resolver.alias = {
  ...config.resolver.alias,
  'react-native-svg': '@tamagui/react-native-svg',
};

module.exports = config;