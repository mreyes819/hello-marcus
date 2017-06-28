const express = require('express');
const app = express();
const router = require('./router');
const bodyParser = require('body-parser');
const words_db = require('../database-postgres/models/model_words.js')

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static(__dirname + '/../react-client/dist'));

app.use('/', router);

app.listen(process.env.PORT, function () {
  console.log(`Server listening on port ${process.env.PORT}!`);
});
