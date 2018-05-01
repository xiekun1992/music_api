const http = require('http');
const { URL } = require('url');

function constructQuerystring(params) {
  let paramsStr = '';
  for (var p in params) {
    paramsStr += '&' + p + '=' + encodeURIComponent(params[p]);
  }
  return paramsStr.slice(1);
}
function get(url, params, callback) {
  let urlObj = new URL(url);
  let options = {
    protocol: 'http:',
    hostname: urlObj.hostname,
    port: urlObj.port,
    path: `${urlObj.pathname}?${constructQuerystring(params)}`,
    method: 'GET',
    headers: {
      'Accept': '*/*',
      // 'Accept-Encoding': 'gzip, deflate',
      'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
      'Referer': 'https://y.qq.com/portal/search.html',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36'
    }
  };
  let requ = http.request(options, resp => {
    resp.setEncoding('utf8');

    let body = '';
    resp.on('data', chunk => {
      body += chunk;
    });
    resp.on('end', () => {
      body = body.trim();
      if(body.startsWith('cb(') && body.endsWith(')')){
        callback && callback(null, JSON.parse(body.slice(3, -1)));
      }else{
        callback && callback(body);
      }
  });
    })
  requ.on('error', err => {
    callback && callback(err);
  });
  requ.end();
}

module.exports = {
  constructQuerystring,
  get
}