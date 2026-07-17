const React = require('react');

// Stub react-native-svg with plain host components so the example's icons
// render in jest without the native module. Only the exports used by
// icons.tsx are mocked.
const stub = (name) => {
  const Component = ({ children }) => React.createElement(name, null, children);
  Component.displayName = name;
  return Component;
};

const Svg = stub('Svg');

module.exports = {
  __esModule: true,
  default: Svg,
  Svg,
  Path: stub('Path'),
  Circle: stub('Circle'),
  SvgXml: stub('SvgXml'),
};
