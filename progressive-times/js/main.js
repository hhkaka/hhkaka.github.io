function retrieveData(url) {                             //retrieveData数据检索
  var xhttp = new XMLHttpRequest();                      //XML HTTP请求
  xhttp.onreadystatechange = function() {               //就绪状态变化
    if (this.readyState == 4 && this.status == 200) {    //就绪状态  status地位;身份;情形，状态
        var result = JSON.parse(this.responseText);      //result结果   responseText这个响应文本
        buildWebPage(result);                            // buildWebPage建Web页面
    }
  };
  xhttp.open('GET', url, true);
  xhttp.send();   //send发送
}

// Get a value from the querystring   从查询获得的价值
function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    var items = location.search.substr(1).split("&");
    for (var index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    }
    return result;
}


// Load the latest news data and populate content 加载最新的新闻数据并填充内容
function loadLatestNews(){
  var dataUrl = './data/latest.json';
  var result = retrieveData(dataUrl);
}


function buildWebPage(result) {
  // Build up our HTML 建立我们的HTML
  var latestNews = '';

  // Loop through the results 循环通过结果
  for (var i = 0; i < result.latestNews.length; i++) {

    var title = '<h2><a href="./article.html?id=' + result.latestNews[i].id + '">' + result.latestNews[i].title + '</a></h2>';
    var description = '<p>' + result.latestNews[i].description + '</p>'

    latestNews += title + description;
  }

  // Update the DOM with the data 用数据更新DOM
  document.getElementById('latest').innerHTML = latestNews;
}

loadLatestNews();

