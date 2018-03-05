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

// Load the article contents into the page  将文章内容加载到页面中
function loadArticle(){
  // Get the details for the article 获取文章的详细信息
  var articleId = findGetParameter('id');
  var articleUrl = './data/data-' + articleId + '.json';
  retrieveData(articleUrl);
}

// Build the web page with the resulting data 用结果数据构建Web页面
function buildWebPage(result){
  document.getElementById('article').innerHTML = result.description;
  document.getElementById('article-title').innerHTML = result.title;
}

loadArticle();