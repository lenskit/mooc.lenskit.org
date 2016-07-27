const express = require('express');

function serve(dir) {
  var app = express();
  app.use(express.static(dir));
  app.listen(4000);
}

module.exports = serve;