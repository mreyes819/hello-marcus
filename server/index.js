const express = require('express');
const app = express();
const router = require('./router');
const bodyParser = require('body-parser');
const model = require('../database-postgres/models/index.js');
require('dotenv').config();
console.log('port inside index', process.env.PORT);
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../react-client/dist'));

//how to make a database call
	// model.Words.getAllWords()
	// .then((data) => console.log(data));

app.use('/', router);

app.listen(port, function () {
  console.log(`Server listening on port ${process.env.PORT}!`);
});
