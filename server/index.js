require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./router');
const bodyParser = require('body-parser');
const model = require('../database-postgres/models/index.js');
console.log('port inside index', process.env.PORT);
const port = process.env.PORT;
const apis = require('../server/apis/index.js');
const fs = require('fs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../react-client/dist'));

app.use('/', router);

app.listen(port, function () {
  console.log(`Server listening on port ${process.env.PORT}!`);
});
