const QQ_API = require('../../api/qq');
const { 
  constructQuerystring,
  get 
} = require('../utils');

function musics(req, res) {
  QQ_API.query.params.p = req.query.page;
  QQ_API.query.params.n = req.query.pageSize;
  QQ_API.query.params.w = req.query.keyword;

  return new Promise((resolve, reject) => {
    get(QQ_API.query.url, QQ_API.query.params, (err, data) => {
      if (err) reject(err);
      resolve(data); 
    });
  });
}
function music(req, res) {
  QQ_API.single.params.songmid = req.params.id;

  return new Promise((resolve, reject) => {
    get(QQ_API.single.url, QQ_API.single.params, (err, data) => {
      if (err) reject(err);
      resolve(data); 
    });
  });
}
function lyric(req, res) {
  QQ_API.lyric.params.musicid = req.params.id;

  return new Promise((resolve, reject) => {
    get(QQ_API.lyric.url, QQ_API.lyric.params, (err, data) => {
      if (err) reject(err);
      resolve(data); 
    }); 
  }); 
}
function album(req, res) {
  QQ_API.album.params.albummid = req.params.id;

  return new Promise((resolve, reject) => {
    get(QQ_API.album.url, QQ_API.album.params, (err, data) => {
      if (err) reject(err);
      resolve(data); 
    });
  });
}
function address(req, res) {
 // 获取地址需要的参数
  QQ_API.params.params.songmid = req.params.id;
  QQ_API.params.params.filename = `C400${req.query.filename}.m4a`;

  return new Promise((resolve, reject) => {
    get(QQ_API.params.url, QQ_API.params.params, (err, data) => {
      if (err) reject(err);
      // 返回音乐链接
      QQ_API.address.params.vkey = data.data.items[0].vkey;
      const url = `${QQ_API.address.url}${data.data.items[0].filename}?${constructQuerystring(QQ_API.address.params)}`;
      resolve(url); 
    });
  });
}  
  

module.exports = {
  musics,
  music,
  lyric,
  album,
  address
};