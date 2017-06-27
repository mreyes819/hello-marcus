const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/', (req, res) => {
  res.send('/index.html');
});

app.post('/voice', (req, res) => {
  console.log('I got your voice object!', req.body);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});