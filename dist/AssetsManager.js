
var AssetsManager = function() {
    this.cacheName = 'appCache'; 
    this.cacheEntries = ['/f9270d2ead3648aa6159.hot-update.json','/img/logo.404c148a.png','/0.js','/1.js','/2.js','/app.js','/e37233a7f580837a311d.hot-update.json','/index.html','/service-worker.js','/','/other'];
    this.hashes = ['85e3aa8d5f5104f4ebaf','0','1','2','app','index','service-worker'];
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

