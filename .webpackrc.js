const webpack = require('webpack');

const path = require('path');

module.exports = () => {
  return {
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components/'),
        '@api': path.resolve(__dirname, 'src/api/'),
        '@images': path.resolve(__dirname, 'src/images/'),
        '@layouts': path.resolve(__dirname, 'src/layouts/'),
        '@pages': path.resolve(__dirname, 'src/pages/'),

      },
    }
  };
};