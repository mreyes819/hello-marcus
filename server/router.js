const express = require('express');
const router = express.Router();
const request = require('request-promise');

router.get('/', (req, res) => {
  // send client side info
  console.log('router working')
  res.send('Hello from the Heroku Server!');
});

router.get('/history', (req, res) => {
  // get request should include credentials
  // look up query history of logged in user 
    // make API calls for each of the saved queries
    // probably need to make a helper function doing a forEach loop of the saved queries
});

router.post('/history', (req, res) => {
  // save query
  // this should save the API call as well as the parameters.
});

router.post('/', (req, res) => {
  // send request information to voice parser
    // on response, send a request using request to the appropriate API
    // on response from API, send data back to client
});

/*
  Should we have another util file or router file that handles all the different API requests?
*/

module.exports = router
