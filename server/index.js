const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = require('./router');

app.use('/*', router);

app.listen(process.env.PORT, function () {
  console.log(`Server listening on port ${process.env.PORT}!`);
});
