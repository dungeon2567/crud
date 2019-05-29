const swCachePlugin = require("sw-cache-plugin");

module.exports = {
    configureWebpack: {
        plugins: [
            new swCachePlugin({
             cacheName:"appCache",
             ignore:[/.*\.map$/,/boot.*/],
             include:['/','/other'] })
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