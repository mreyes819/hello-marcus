const express = require('express');
const router = express.Router();
const request = require('request-promise');
const handler = require('./apihandler');

router.get('/', (req, res) => {
  // send client side info
  console.log('router working')
  res.send('../react-client/src/index');
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
  console.log('I got your voice object!', req.body);
  // do a database query using the req.body
  // then use the api name
    let testApiName = 'yelp';
    res.send(handler(testApiName));
    // on response, send a request to the appropriate API
    // on response from API, send data back to client
});

module.exports = router
