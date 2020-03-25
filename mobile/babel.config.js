module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  // Config para usar o til nos imports
  plugins: [
    [
      'babel-plugin-root-import',
      {
        rootPathSuffix: 'src',
      },
    ],
  ],
};
