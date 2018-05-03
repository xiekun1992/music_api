const dispatcher = require('./dispatcher');

function dispatchQuery(req, res) {
  let promises = [];
  for (const d in dispatcher) {
    promises.push(dispatcher[d].musics(req, res));
  }
  Promise.all(promises).then(res => {
    res.json(res);
  }).catch(res => {
    res.json(res);
  });
}
function dispatchGet(req, res) {
  let promises = [];
  for (const d in dispatcher) {
    promises.push(dispatcher[d].music(req, res));
  }
  Promise.all(promises).then(res => {
    res.json(res);
  }).catch(res => {
    res.json(res);
  });
}
function dispatchAlbum(req, res) {
  let promises = [];
  for (const d in dispatcher) {
    promises.push(dispatcher[d].album(req, res));
  }
  Promise.all(promises).then(res => {
    res.json(res);
  }).catch(res => {
    res.json(res);
  });
}
function dispatchLyric(req, res) {
  let promises = [];
  for (const d in dispatcher) {
    promises.push(dispatcher[d].lyric(req, res));
  }
  Promise.all(promises).then(res => {
    res.json(res);
  }).catch(res => {
    res.json(res);
  });
}
function dispatchAddress(req, res) {
  let promises = [];
  for (const d in dispatcher) {
    promises.push(dispatcher[d].address(req, res));
  }
  Promise.all(promises).then(res => {
    res.json(res);
  }).catch(res => {
    res.json(res);
  });
}

function Proxy(app) {
  app.get('/api/musics', (req, res) => {
    dispatchQuery(req, res);
  });
  app.get('/api/music/:id', (req, res) => {
    dispatchGet(req, res);
  })
  app.get('/api/music/:id/lyric', (req, res) => {
    dispatchLyric(req, res);
  })
  app.get('/api/music/album/:id', (req, res) => {
    dispatchAlbum(req, res);
  })
  app.get('/api/music/:id/address', (req, res) => {
    dispatchAddress(req, res);
  });
}

module.exports = Proxy;