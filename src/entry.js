const dispatcher = require('./dispatcher');

function dispatchQuery(req, res) {
  for (const d in dispatcher) {
    dispatcher[d].musics(req, res);
  }
}
function dispatchGet(req, res) {
  for (const d in dispatcher) {
    dispatcher[d].music(req, res);
  }
}
function dispatchAlbum(req, res) {
  for (const d in dispatcher) {
    dispatcher[d].album(req, res);
  }
}
function dispatchLyric(req, res) {
  for (const d in dispatcher) {
    dispatcher[d].lyric(req, res);
  }
}
function dispatchAddress(req, res) {
  for (const d in dispatcher) {
    dispatcher[d].address(req, res);
  }
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