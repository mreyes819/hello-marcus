const express = require('express');
const app = express();
const router = require('./router');
const bodyParser = require('body-parser');
const model = require('../database-postgres/models/index.js');
require('dotenv').config();
console.log('port inside index', process.env.PORT);
const port = process.env.PORT;
const apis = require('../server/apis/index.js');

// ** install dependencies for houndify **
var fs = require('fs');
var https = require('https');
var path = require('path');
//"houndify" module contains both client-side ("HoundifyClient") and server-side ("HoundifyExpress") parts of SDK
var Houndify = require('houndify');
//parse arguments


// currently installed
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../react-client/dist'));


app.use('/', router);



//config file
var configFile = 'config'; // config.json file for credentials.
var config = require(path.join(__dirname, configFile));

//express app
var publicFolder = '../react-client/dist'; // Not sure why this is being done!!!!
app.use(express.static(path.join(__dirname, publicFolder)));

// authenticates requests
app.get('/houndifyAuth', Houndify.HoundifyExpress.createAuthenticationHandler({
  clientId:  config.clientId,
  clientKey: config.clientKey
}));

//sends the request to Houndify backend with authentication headers
app.post('/textSearchProxy', bodyParser.text({ limit: '1mb' }), Houndify.HoundifyExpress.createTextProxyHandler());

app.post('/voiceResult', function(req, res) {
  console.log(req.body);
})

app.post('/textResult', function(req, res) {
  console.log(req.body);
})
// if (config.https) {

//   //ssl credentials
//   var privateKey = fs.readFileSync(config.sslKeyFile);
//   var certificate = fs.readFileSync(config.sslCrtFile);
//   var credentials = { key: privateKey, cert: certificate };

//   //https server
//   var httpsServer = https.createServer(credentials, app);
//   httpsServer.listen(port, function() {
//     console.log("HTTPS server running on port", port);
//     console.log("Open https://localhost:" + port, "in the browser to view the Web SDK demo");
//   });

// } else {

//   app.listen(port, function() {
//     console.log("HTTP server running on port", port);
//     console.log("Open http://localhost:" + port, "in the browser to view the Web SDK demo");
//   });

// }








app.listen(port, function () {
  console.log(`Server listening on port ${process.env.PORT}!`);
});
