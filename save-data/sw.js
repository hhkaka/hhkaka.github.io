var cacheName = 'save-data';

// Cache our known resources during install
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
    .then(cache => cache.addAll([
      './js/main.js',
      './js/article.js',
      './images/newspaper.svg',
      './css/site.css',
      './data/latest.json',
      './data/data-1.json',
      './article.html',
      './index.html'
    ]))
  );
});

// Cache any new resources as they are fetched
self.addEventListener //self自己  addEventListener添加事件侦听器
(
	'fetch', function(event)  //器fetch取来 function函数（功能） event事件
		{ 
			event.respondWith     //event回应 respondWith  回应
		(                           
			caches.match(event.request)                  //caches 高速缓存 match函数（比较）  request请求
    		.then                        //然后
			(
				function(response)       // response 反应;回答，答复;
	 			{                  
      				if (response)
					{                           
					return response;     //return 返回
      				}
			
					var fetchRequest = event.request.clone();  //fetchRequest取得请求   event.request.clone事件请求克隆
			
					return fetch(fetchRequest)  //返回接取要求
				
					.then		       //然后
					(
						function(fetchResponse)  //函数 读取响应
							{				
							if(!fetchResponse || fetchResponse.status !== 200) //假如获取响应  响应获取响应状态  &&是逻辑运算符，代表与（就是并且），条件都成立，返回值是 true，否则 FALSE。 ||是逻辑运算符，代表或（就是或者），条件中有一者成立，返回值是 true  否则 false
							{
           					return fetchResponse;  //返回取得响应
							}

							var responseToCache = fetchResponse.clone();  //响应缓= 获取响应的克隆

							caches.open(cacheName)  // 缓存打开 缓存名称
								.then               //然后
								(
									function(cache) //函数 缓存
										{
            							cache.put(event.request, responseToCache);//cache.put缓存放入  event.request事件请 求responseToCache 响应缓存
										}
								);
								return fetchResponse; //读取响应
						}
		
      				);
    			}
			)
		);
	}
);