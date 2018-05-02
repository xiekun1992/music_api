const express = require('express');
const app = express();
require('./src/entry')(app);

const server = app.listen(3000, () => {
  console.log(server.address())
  let host = server.address().address;
  let port = server.address().port;

  console.log(`server listening at http://${host}:${port}`);
});