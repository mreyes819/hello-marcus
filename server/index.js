const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = require('./router');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static(__dirname + '/../react-client/dist'));

app.use('/', router);

app.listen(process.env.PORT, function () {
  console.log(`Server listening on port ${process.env.PORT}!`);
});
