var express = require('express');
var bodyParser = require('body-parser');
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(process.env.PORT, function () {
  console.log(`Server listening on port ${process.env.PORT}!`)
})