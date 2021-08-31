module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['import'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['.'],
        alias: {
          '@ctumaps': './src',
          '@mapview': './src/components/map/web/src',
        },
      },
    },
  },
  env: {
    browser: true,
    node: true,
  },
};
