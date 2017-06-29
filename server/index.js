const express = require('express');
const app = express();
const router = require('./router');
const bodyParser = require('body-parser');
const model = require('../database-postgres/models/index.js');
require('dotenv').config();
console.log('port inside index', process.env.PORT);
const port = process.env.PORT;
const apis = require('../server/apis/index.js');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../react-client/dist'));


//how to use cleverbot
	// apis.cbot.getResponse('who is barack obama')
	// .then((data) => console.log(data));
// apis.weather.getWeather('{"lat":"37.7837039","lon":"-122.4091297"}')
// .then((data) => console.log(data));
//how to make a database call
	// model.words.getAllWords()
	// .then((data) => console.log(data));

app.use('/', router);

app.listen(port, function () {
  console.log(`Server listening on port ${process.env.PORT}!`);
});
