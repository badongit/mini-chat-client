const { addWebpackAlias, override } = require('customize-cra');
const path = require('path');

module.exports = override(
  addWebpackAlias({
    '@components': path.resolve(__dirname, 'src/components'),
    '@services': path.resolve(__dirname, 'src/services'),
    '@assets': path.resolve(__dirname, 'src/assets'),
    '@constants': path.resolve(__dirname, 'src/constants'),
    '@layouts': path.resolve(__dirname, 'src/layouts'),
    '@pages': path.resolve(__dirname, 'src/pages'),
    '@socket': path.resolve(__dirname, 'src/socket'),
    '@store': path.resolve(__dirname, 'src/store'),
    '@models': path.resolve(__dirname, 'src/typedef/models'),
    '@utils': path.resolve(__dirname, 'src/utils'),
    '@hooks': path.resolve(__dirname, 'src/hooks'),
  }),
);
