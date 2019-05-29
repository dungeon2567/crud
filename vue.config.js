const {InjectManifest} = require('workbox-webpack-plugin');

module.exports = {
    webpackConfiguration: {
        plugins: [
            new InjectManifest({
              swSrc: './src/service-worker  .js',
            })
          ]
    },
    devServer: {
        open: true,
        host: '0.0.0.0',
        port: 8085, // CHANGE YOUR PORT HERE!
        https: true,
        hotOnly: false,
    },
}