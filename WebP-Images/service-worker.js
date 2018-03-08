"use strict";  //用严格的


// Listen to fetch events 听取事件
self.addEventListener('fetch', function(event) {

  // Check if the image is a jpeg
  if (/\.jpg$|.png$/.test(event.request.url)) {

    // Inspect the accept header for WebP support
    var supportsWebp = false; //supportsWebp支持WebP
    if (event.request.headers.has('accept')) {  //headers头部 has有 accept接受
      supportsWebp = event.request.headers
        .get('accept')
        .includes('webp');  //includes包括
    }

    // If we support WebP   如果我们支持WebP
    if (supportsWebp) {
      // Clone the request  克隆的要求
      var req = event.request.clone();

      // Build the return URL 构建返回URL
      var returnUrl = req.url.substr(0, req.url.lastIndexOf(".")) + ".webp";  //req.url.lastIndexOf请求的URL字符串

      event.respondWith(
        fetch(returnUrl, {
          mode: 'no-cors'  //不连续
        })
      );
    }
  }
});
//1.检查传入的 HTTP 请求是否是 JPEG 或 PNG 类型的图片 2.检查 accept 首部是否支持 WebP  3.浏览器是否支持 WebP？ 4.创建返回 URL
//上面清单中的代码很多，我们分解来看。最开始的几行，我添加了事件监听器来监听任何触发的 fetch 事件。对于每个发起的 HTTP 请求，我会检查当前请求是否是 JEPG 或 PNG 图片。如果我知道当前请求的是图片，我可以根据传递的 HTTP 首部来返回最适合的内容。在本例中，我检查每个首部并寻找 image/webp 的 mime 类型。一旦知道首部的值，我便能判断出浏览器是否支持 WebP 并返回相应的 WebP 图片。
//一旦 Service Worker 激活并准备好，对于支持 WebP 的浏览器，任何 JPEG 或 PNG 图片的请求都会返回同样内容的 WebP 图片。如果浏览器不支持 WebP 图片，它不会在 HTTP 请求首部中声明支持，Service Worker 会忽略该请求并继续正常工作。