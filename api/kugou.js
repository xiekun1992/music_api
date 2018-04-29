module.exports = {
  query: {
    url: 'http://songsearch.kugou.com/song_search_v2',
    params: {
      callback: 'cb',
      keyword: null,
      page: 1,
      pagesize: 20,
      userid: -1,
      clientver: '',
      platform: 'WebFilter',
      tag: 'em',
      filter: 2,
      iscorrection: 1,
      privilege_filter: 0,
      _: 1524998263933 //时间戳
    }
  },
  single: { // 接口请求响应中自带歌词
    url: 'http://www.kugou.com/yy/index.php',
    params: {
      r: 'play/getdata', 
      hash: 'C012FD56B008D73DE579125827FE7183', // 歌曲的FileHash值
      album_id: 948327, 
      _: 1525015614024
    }
  },
  album: {
    url: `http://www.kugou.com/yy/album/single/${albumId}.html`//需要提取html元素信息
  }
};