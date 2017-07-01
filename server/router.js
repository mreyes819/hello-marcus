require('dotenv').config();
const express = require('express');
const router = express.Router();
const request = require('request-promise');
const handler = require('./apihandler');
const Houndify = require('houndify');
const path = require('path');
const https = require('https');

const fred = require('./fred/engine');

router.get('/', (req, res) => {
  // send client side info
  console.log('router working')
  res.send('../react-client/src/index.jsx');
});

router.get('/saved', (req, res) => {
  // get request should include credentials
  // look up query history of logged in user
    // make API calls for each of the saved queries
    // probably need to make a helper function doing a forEach loop of the saved queries
  res.send('get to history endpoint')

});

router.post('/saved', (req, res) => {
  // save query
  // this should save the API call as well as the parameters.
  res.send('post to history endpoint')
});

router.post('/voice', (req, res) => {

  fred(req.body.RawTranscription, req.body.location)
  .then((data) => {
    res.send(data);
  })
  .catch((error) => {
    console.log('fred error: ', error);
    res.send('Sorry, something went wrong');
  });

});

// authenticates houndify requests
router.get('/houndifyAuth', Houndify.HoundifyExpress.createAuthenticationHandler({
  clientId:  process.env.clientId,
  clientKey: process.env.clientKey
}));

// TODO: For using houndify outside of localhost with HTTPS
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

module.exports = router;
