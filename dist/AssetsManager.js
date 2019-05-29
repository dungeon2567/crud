
var AssetsManager = function() {
    this.cacheName = 'appCache'; 
    this.cacheEntries = ['/img/logo.404c148a.png','/css/app.e234c611.css','/js/app.d1fc18d5.js','/css/chunk-0de5bf28.1399107e.css','/js/chunk-0de5bf28.b198d861.js','/js/chunk-2d0a447c.0c25877d.js','/js/chunk-2d0e613e.286b9177.js','/css/chunk-vendors.391ed6f9.css','/js/chunk-vendors.05bfbc65.js','/index.html','/img/icons/apple-touch-icon-120x120.png','/img/icons/apple-touch-icon-152x152.png','/img/icons/apple-touch-icon-180x180.png','/img/icons/apple-touch-icon-60x60.png','/img/icons/apple-touch-icon-76x76.png','/img/icons/apple-touch-icon.png','/img/icons/favicon-16x16.png','/img/icons/favicon-32x32.png','/manifest.json','/robots.txt','/img/icons/android-chrome-192x192.png','/img/icons/msapplication-icon-144x144.png','/favicon.ico','/img/icons/mstile-150x150.png','/img/icons/android-chrome-512x512.png','/service-worker.js','/img/icons/safari-pinned-tab.svg','/','/other'];
    this.hashes = ['ce54aa53436ab71a5fbd','index','img/icons/apple-touch-icon-120x120','img/icons/apple-touch-icon-152x152','img/icons/apple-touch-icon-180x180','img/icons/apple-touch-icon-60x60','img/icons/apple-touch-icon-76x76','img/icons/apple-touch-icon','img/icons/favicon-16x16','img/icons/favicon-32x32','manifest','robots','img/icons/android-chrome-192x192','img/icons/msapplication-icon-144x144','favicon','img/icons/mstile-150x150','img/icons/android-chrome-512x512','service-worker','img/icons/safari-pinned-tab'];
};

AssetsManager.prototype.addAllToCache = function() {
    if(!this.cacheName)
        throw new Error('Please provide cacheName in plugin options');
    const ctx = this;

    return caches.open(ctx.cacheName).then(function(cache) {
      Promise.all(
        ctx.cacheEntries.map(function(asset){cache.add(asset)})
      );
    });            
};

AssetsManager.prototype.removeNotInAssets = function() {
    var ctx = this;   
    
     return caches.open(ctx.cacheName).then(function(cache) {
          cache.keys().then(function(keys) {
              return Promise.all(
                keys.filter(function(request){
                  var erase = true;
                  var noErase = false;          
                  return ctx.cacheEntries.indexOf(request.url) >= 0 ? noErase:erase;
                }).map(function(entryToErase){          
                  cache.delete(entryToErase);                                
                })      
              );
          });
      }); 
};

