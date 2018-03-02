var cacheName = 'precache';

self.addEventListener('install', event => {   //addEventListener注册侦听器 install安装 event事件
  event.waitUntil(   //waitUntil等到
    caches.open(cacheName)   //缓存打开  缓存名称
    .then(cache => cache.addAll([     //高速缓存的所有   =>一般用在数组中，一个对应关系
      './js/sucaijiayuan.js',
      './images/政协-1.jpg',
      './images/hhzdt.jpg'	  
    ]))
  );
});

//缓存的名称,我们将进入 Service Worker 的安装事件,使用我们指定的缓存名称来打开缓存,把 JavaScript 和 图片文件添加到缓存中

//我们看过了 Service Worker 生命周期和它激活之前所经历的不同阶段。其中一个阶段就是 install 事件，它发生在浏览器安装并注册 Service Worker 时。这是把资源添加到缓存中的绝佳时间，在后面的阶段可能会用到这些资源。
//进入了 install 事件，并在此阶段将 JavaScript 文件和 hello 图片添加到缓存中。在上面的清单中，我还引用了一个叫做 cacheName 的变量。这是一个字符串，我用它来设置缓存的名称。你可以为每个缓存取不同的名称，甚至可以拥有一个缓存的多个不同的副本，因为每个新的字符串使其唯一。当看到本章后面的版本控制和缓存清除时，你将会感受到它所带来的便利。

//在清单3.2中，你可以看到一旦缓存被开启，我们就可以开始把资源添加进去。接下来，我们调用了 cache.addAll() 并传入文件数组。event.waitUntil() 方法使用了 JavaScript 的 Promise 并用它来知晓安装所需的时间以及是否安装成功。

//如果所有的文件都成功缓存了，那么 Service Worker 便会安装完成。如果任何文件下载失败了，那么安装过程也会随之失败。这点非常重要，因为它意味着你需要依赖的所有资源都存在于服务器中，并且你需要注意决定在安装步骤中缓存的文件列表。定义一个很长的文件列表便会增加缓存失败的几率，多一个文件便多一份风险，从而导致你的 Servicer Worker 无法安装。

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
    .then(function(response) {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

//现在我们的缓存已经准备好了，我们能够开始从中读取资源。我们需要在清单3.3中添加代码，让 Service Worker 开始监听 fetch 事件。
//添加 fetch 事件的事件监听器,检查传入的请求 URL 是否匹配当前缓存中存在的任何内容。 如果有 response 并且它不是 undefined 或 null 的话就将它返回。 否则只是如往常一样继续，通过网络获取预期的资源
//我们首先为 fetch 事件添加一个事件监听器。接下来，我们使用 caches.match() 函数来检查传入的请求 URL 是否匹配当前缓存中存在的任何内容。如果存在的话，我们就简单地返回缓存的资源。但是，如果资源并不存在于缓存当中，我们就如往常一样继续，通过网络来获