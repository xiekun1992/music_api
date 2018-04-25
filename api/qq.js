module.exports = {
    query: {
      url: 'https://c.y.qq.com/soso/fcgi-bin/client_search_cp',
      params: {
        ct:24,
        qqmusic_ver:1298,
        new_json:1,
        remoteplace:'txt.yqq.song',
        searchid:53964430174370120,
        t:0,
        aggr:1,
        cr:1,
        catZhida:1,
        lossless:0,
        flag_qc:0,
        p:1, // 第几页,
        n:10, // 每页条数,
        w:'半壶纱', // 搜索关键字,
        g_tk:5381,
        jsonpCallback:'cb', // jsonp全局函数
        loginUin:0,
        hostUin:0,
        format:'jsonp',
        inCharset:'utf8',
        outCharset:'utf-8',
        notice:0,
        platform:'yqq',
        needNewCode:0
      }
    },
    single: {
      url: 'https://c.y.qq.com/v8/fcg-bin/fcg_play_single_song.fcg',
      params: {
        songmid: null, // 歌曲mid
        tpl:'yqq_song_detail',
        format:'jsonp',
        callback:'cb',
        g_tk:5381,
        jsonpCallback:'cb',
        loginUin:0,
        hostUin:0,
        format:'jsonp',
        inCharset:'utf8',
        outCharset:'utf-8',
        notice:0,
        platform:'yqq',
        needNewCode:0
      }
    },
    album: {
      url: 'https://shc.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg',
      params: {
        albummid:null, //专辑mid
        g_tk:5381,
        jsonpCallback:'cb',
        loginUin:0,
        hostUin:0,
        format:'jsonp',
        inCharset:'utf8',
        outCharset:'utf-8',
        notice:0,
        platform:'yqq',
        needNewCode:0
      }
    },
    lyric: {
      url: 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric.fcg',
      params: {
        nobase64:1,
        musicid:null,
        callback:'cb',
        g_tk:5381,
        jsonpCallback:'cb',
        loginUin:0,
        hostUin:0,
        format:'jsonp',
        inCharset:'utf8',
        outCharset:'utf-8',
        notice:0,
        platform:'yqq',
        needNewCode:0
      }
    }
}