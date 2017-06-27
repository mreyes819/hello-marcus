const api = require('./apis');


const handler = (apiName) => {
  api[apiName]();
};

handler('yelp')