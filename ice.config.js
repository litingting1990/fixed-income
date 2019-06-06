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
  alias: {
    '@components': path.resolve(__dirname, 'src/components/'),
    '@api': path.resolve(__dirname, 'src/api/'),
    '@pages': path.resolve(__dirname, 'src/pages/'),
    '@store': path.resolve(__dirname, 'src/store/'),
    '@utils': path.resolve(__dirname, 'src/utils/'),
    '@images': path.resolve(__dirname, 'src/images/')
  },
  proxy: {
    '/**': {
      enable: true,
      target: 'http://118.31.43.6:8089',
      changeOrigin: true
    }
  }
};
