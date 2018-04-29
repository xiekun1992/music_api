const express = require('express');
const app = express();
const http = require('http');
const { URL } = require('url');
const QQ_API = require('./api/qq');

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

app.get('/api/musics', (req, res) => {
  QQ_API.query.params.p = req.query.page;
  QQ_API.query.params.n = req.query.pageSize;
  QQ_API.query.params.w = req.query.keyword;

  get(QQ_API.query.url, QQ_API.query.params, (err, data) => {
    if (err) res.send(err);
    res.json(data); 
  });
});
app.get('/api/music/:id', (req, res) => {
  // console.log(req.params.id)
  QQ_API.single.params.songmid = req.params.id;
  get(QQ_API.single.url, QQ_API.single.params, (err, data) => {
    if (err) res.send(err);
    res.json(data); 
  });
})
app.get('/api/music/:id/lyric', (req, res) => {
  QQ_API.lyric.params.musicid = req.params.id;
  get(QQ_API.lyric.url, QQ_API.lyric.params, (err, data) => {
    if (err) res.send(err);
    res.json(data); 
  });
})
app.get('/api/music/album/:id', (req, res) => {
  QQ_API.album.params.albummid = req.params.id;
  get(QQ_API.album.url, QQ_API.album.params, (err, data) => {
    if (err) res.send(err);
    res.json(data); 
  });
})
app.get('/api/music/:id/address', (req, res) => {
  // 获取地址需要的参数
  QQ_API.params.params.songmid = req.params.id;
  QQ_API.params.params.filename = `C400${req.query.filename}.m4a`;
  get(QQ_API.params.url, QQ_API.params.params, (err, data) => {
    if (err) res.send(err);
    // 返回音乐链接
    QQ_API.address.params.vkey = data.data.items[0].vkey;
    const url = `${QQ_API.address.url}${data.data.items[0].filename}?${constructQuerystring(QQ_API.address.params)}`;
    res.json(url); 
  });
});


const server = app.listen(3000, () => {
  console.log(server.address())
  let host = server.address().address;
  let port = server.address().port;

  console.log(`server listening at http://${host}:${port}`);
});