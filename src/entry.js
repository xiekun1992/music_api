const dispatcher = require('./dispatcher');

function dispatchQuery(req, res) {
  let promises = [];
  for (const d in dispatcher) {
    promises.push(dispatcher[d].musics(req, res));
  }
  Promise.all(promises).then(datum => {
    res.json(datum);
  }).catch(err => {
    res.json(err);
  });
}
function dispatchGet(req, res) {
  let promises = [];
  for (const d in dispatcher) {
    promises.push(dispatcher[d].music(req, res));
  }
  Promise.all(promises).then(datum => {
    res.json(datum);
  }).catch(err => {
    res.json(err);
  });
}
function dispatchAlbum(req, res) {
  let promises = [];
  for (const d in dispatcher) {
    promises.push(dispatcher[d].album(req, res));
  }
  Promise.all(promises).then(datum => {
    res.json(datum);
  }).catch(err => {
    res.json(err);
  });
}
function dispatchLyric(req, res) {
  let promises = [];
  for (const d in dispatcher) {
    promises.push(dispatcher[d].lyric(req, res));
  }
  Promise.all(promises).then(datum => {
    res.json(datum);
  }).catch(err => {
    res.json(err);
  });
}
function dispatchAddress(req, res) {
  let promises = [];
  for (const d in dispatcher) {
    promises.push(dispatcher[d].address(req, res));
  }
  Promise.all(promises).then(datum => {
    res.json(datum);
  }).catch(err => {
    res.json(err);
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