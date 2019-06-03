const path = require('path');


module.exports = {
  entry: 'src/index.js',
  publicPath: './',
  plugins: [
    ['ice-plugin-fusion', {
      theme: '@icedesign/theme'
    }],
    ['ice-plugin-moment-locales', {
      locales: ['zh-cn']
    }]
  ],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components/'),
      '@api': path.resolve(__dirname, 'src/api/'),
      '@layouts': path.resolve(__dirname, 'src/layouts/'),
      '@pages': path.resolve(__dirname, 'src/pages/')
    }
  }
};
