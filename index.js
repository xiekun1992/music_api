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
  // res.json({
  //   "album": {
  //     "id": 3768943,
  //     "mid": "001a46gn1j8WML", // 专辑mid
  //     "name": "可不可以勇敢",
  //     "subtitle": "",
  //     "time_public": "2017-12-14",
  //     "title": "可不可以勇敢"
  //   },
  //   "id": 212594073, // 歌曲id
  //   "mid": "000uDUTX3Rr87n", // 歌曲mid
  //   "name": "半壶纱",
  //   "singer": [
  //     {
  //       "id": 2079865,
  //       "mid": "001TIyq72MIuZX",
  //       "name": "张笑晨",
  //       "title": "张笑晨",
  //       "type": 1,
  //       "uin": 0
  //     }
  //   ],
  // });
})
app.get('/api/music/:id/lyric', (req, res) => {
  QQ_API.lyric.params.musicid = req.params.id;
  get(QQ_API.lyric.url, QQ_API.lyric.params, (err, data) => {
    if (err) res.send(err);
    res.json(data); 
  });
  // &#58; = ':'
  // &#46; = '.'
  // &#13;&#10; = '\r\n'
  // &#32; = ' '
  // &#45; = '-'
  // &#10; = '\n'
  // res.json({
  //   "lyric": "[ti&#58;半壶纱]&#13;&#10;[ar&#58;张笑晨]&#13;&#10;[al&#58;不可以勇敢]&#13;&#10;[by&#58;]&#13;&#10;[offset&#58;0]&#13;&#10;[00&#58;00&#46;52]半壶纱&#32;&#45;&#32;张笑晨&#13;&#10;[00&#58;01&#46;73]词：刘珂矣/百慕三石&#13;&#10;[00&#58;03&#46;56]曲：刘珂矣/百慕三石&#13;&#10;[00&#58;05&#46;50]&#10;[00&#58;25&#46;51]墨已入水渡一池青花&#13;&#10;[00&#58;31&#46;48]揽五分红霞采竹回家&#13;&#10;[00&#58;37&#46;73]悠悠风来埋一地桑麻&#13;&#10;[00&#58;43&#46;79]一身袈裟把相思放下&#13;&#10;[00&#58;49&#46;67]十里桃花待嫁的年华&#13;&#10;[00&#58;55&#46;93]凤冠的珍珠挽进头发&#13;&#10;[01&#58;02&#46;01]檀香拂过玉镯弄轻纱&#13;&#10;[01&#58;08&#46;29]空留一盏芽色的清茶&#13;&#10;[01&#58;14&#46;20]倘若我心中的山水&#13;&#10;[01&#58;18&#46;17]你眼中都看到&#13;&#10;[01&#58;20&#46;94]&#10;[01&#58;21&#46;55]我便一步一莲花祈祷&#13;&#10;[01&#58;26&#46;43]怎知那浮生一片草&#13;&#10;[01&#58;30&#46;12]&#10;[01&#58;30&#46;69]岁月催人老&#13;&#10;[01&#58;33&#46;19]&#10;[01&#58;33&#46;77]风月花鸟一笑尘缘了&#13;&#10;[01&#58;38&#46;38]&#10;[02&#58;03&#46;16]十里桃花待嫁的年华&#13;&#10;[02&#58;09&#46;24]凤冠的珍珠挽进头发&#13;&#10;[02&#58;15&#46;48]檀香拂过玉镯弄轻纱&#13;&#10;[02&#58;21&#46;64]空留一盏芽色的清茶&#13;&#10;[02&#58;27&#46;58]倘若我心中的山水&#13;&#10;[02&#58;31&#46;54]你眼中都看到&#13;&#10;[02&#58;34&#46;36]&#10;[02&#58;34&#46;99]我便一步一莲花祈祷&#13;&#10;[02&#58;39&#46;91]怎知那浮生一片草&#13;&#10;[02&#58;43&#46;42]&#10;[02&#58;43&#46;95]岁月催人老&#13;&#10;[02&#58;46&#46;63]&#10;[02&#58;47&#46;14]风月花鸟一笑尘缘了&#13;&#10;[02&#58;52&#46;08]倘若我心中的山水&#13;&#10;[02&#58;56&#46;11]你眼中都看到&#13;&#10;[02&#58;58&#46;79]&#10;[02&#58;59&#46;40]我便一步一莲花祈祷&#13;&#10;[03&#58;04&#46;29]怎知那浮生一片草&#13;&#10;[03&#58;07&#46;87]&#10;[03&#58;08&#46;54]岁月催人老&#13;&#10;[03&#58;10&#46;98]&#10;[03&#58;11&#46;60]风月花鸟一笑尘缘了&#13;&#10;[03&#58;16&#46;58]怎知那浮生一片草&#13;&#10;[03&#58;20&#46;05]&#10;[03&#58;20&#46;72]岁月催人老&#13;&#10;[03&#58;23&#46;13]&#10;[03&#58;23&#46;75]风月花鸟一笑尘缘了"
  // });
})
app.get('/api/music/album/:id', (req, res) => {
  QQ_API.album.params.albummid = req.params.id;
  get(QQ_API.album.url, QQ_API.album.params, (err, data) => {
    if (err) res.send(err);
    res.json(data); 
  });
  // res.json({
  //   "mid": "001a46gn1j8WML", // 专辑mid
  //   "name": "可不可以勇敢", // 专辑名称
  //   "aDate": "2017-12-14", // 发行时间
  //   "company": "维音唱片",
  //   "singerid": 2079865,
  //   "singermid": "001TIyq72MIuZX",
  //   "singername": "张笑晨",
  //   "desc": "歌手张笑晨 2017年原创单曲《可不可以勇敢》首发！请记得我，从你的全世界路过…",
  //   "genre": "Pop 流行", // 流派
  //   "id": 3768943,
  //   "lan": "国语", // 语种
  //   "list": [
  //     {
  //       "albumdesc": "",
  //       "albumid": 3768943,
  //       "albummid": "001a46gn1j8WML",
  //       "albumname": "可不可以勇敢",
  //       "alertid": 11,
  //       "belongCD": 1,
  //       "cdIdx": 0,
  //       "interval": 300,
  //       "isonly": 0,
  //       "label": "0",
  //       "msgid": 0,
  //       "pay": {
  //         "payalbum": 0,
  //         "payalbumprice": 0,
  //         "paydownload": 0,
  //         "payinfo": 0,
  //         "payplay": 0,
  //         "paytrackmouth": 0,
  //         "paytrackprice": 0,
  //         "timefree": 0
  //       },
  //       "preview": {
  //         "trybegin": 0,
  //         "tryend": 0,
  //         "trysize": 0
  //       },
  //       "rate": 31,
  //       "singer": [
  //         {
  //           "id": 2079865,
  //           "mid": "001TIyq72MIuZX",
  //           "name": "张笑晨"
  //         }
  //       ],
  //       "songid": 212445001,
  //       "songmid": "000vroiH4JLZAd",
  //       "songname": "可不可以勇敢",
  //       "songorig": "可不可以勇敢",
  //       "songtype": 0,
  //       "strMediaMid": "000vroiH4JLZAd",
  //       "stream": 13,
  //       "switch": 603923,
  //       "type": 0,
  //       "vid": ""
  //     },
  //     {
  //       "albumdesc": "",
  //       "albumid": 3768943,
  //       "albummid": "001a46gn1j8WML",
  //       "albumname": "可不可以勇敢",
  //       "alertid": 11,
  //       "belongCD": 2,
  //       "cdIdx": 0,
  //       "interval": 300,
  //       "isonly": 0,
  //       "label": "0",
  //       "msgid": 0,
  //       "pay": {
  //         "payalbum": 0,
  //         "payalbumprice": 0,
  //         "paydownload": 0,
  //         "payinfo": 0,
  //         "payplay": 0,
  //         "paytrackmouth": 0,
  //         "paytrackprice": 0,
  //         "timefree": 0
  //       },
  //       "preview": {
  //         "trybegin": 0,
  //         "tryend": 0,
  //         "trysize": 0
  //       },
  //       "rate": 31,
  //       "singer": [
  //         {
  //           "id": 2079865,
  //           "mid": "001TIyq72MIuZX",
  //           "name": "张笑晨"
  //         }
  //       ],
  //       "size128": 4817191,
  //       "size320": 12042661,
  //       "size5_1": 0,
  //       "sizeape": 26221142,
  //       "sizeflac": 26235584,
  //       "sizeogg": 7095925,
  //       "songid": 212445002,
  //       "songmid": "000rhxXj1sagKA",
  //       "songname": "可不可以勇敢 (伴奏)",
  //       "songorig": "可不可以勇敢",
  //       "songtype": 0,
  //       "strMediaMid": "000rhxXj1sagKA",
  //       "stream": 13,
  //       "switch": 599827,
  //       "type": 0,
  //       "vid": ""
  //     },
  //     {
  //       "albumdesc": "",
  //       "albumid": 3768943,
  //       "albummid": "001a46gn1j8WML",
  //       "albumname": "可不可以勇敢",
  //       "alertid": 11,
  //       "belongCD": 3,
  //       "cdIdx": 0,
  //       "interval": 221,
  //       "isonly": 0,
  //       "label": "0",
  //       "msgid": 0,
  //       "pay": {
  //         "payalbum": 0,
  //         "payalbumprice": 0,
  //         "paydownload": 0,
  //         "payinfo": 0,
  //         "payplay": 0,
  //         "paytrackmouth": 0,
  //         "paytrackprice": 0,
  //         "timefree": 0
  //       },
  //       "preview": {
  //         "trybegin": 0,
  //         "tryend": 0,
  //         "trysize": 0
  //       },
  //       "rate": 31,
  //       "singer": [
  //         {
  //           "id": 2079865,
  //           "mid": "001TIyq72MIuZX",
  //           "name": "张笑晨"
  //         }
  //       ],
  //       "size128": 3541566,
  //       "size320": 8853618,
  //       "size5_1": 0,
  //       "sizeape": 25979885,
  //       "sizeflac": 26077917,
  //       "sizeogg": 5243989,
  //       "songid": 212594073,
  //       "songmid": "000uDUTX3Rr87n",
  //       "songname": "半壶纱",
  //       "songorig": "半壶纱",
  //       "songtype": 0,
  //       "strMediaMid": "000uDUTX3Rr87n",
  //       "stream": 13,
  //       "switch": 603923,
  //       "type": 0,
  //       "vid": ""
  //     } // 专辑中的歌曲
  //   ],
  // });
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