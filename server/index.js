const express = require('express');
const bodyParser = require('body-parser');
const app = express()

app.get('/', function (req, res) {
  res.send('Hello from the Heroku Server!');
});

app.listen(process.env.PORT, function () {
  console.log(`Server listening on port ${process.env.PORT}!`);
});