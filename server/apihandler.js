const api = require('./apis');

// handler takes 2 arguments, which API to call and the parameters to call it with
const handler = (apiName, loc, placeStr, originalStr) => { 
  console.log(api);
  if (apiName) {
    return api[apiName].getResponse(loc, placeStr);
  } else {
    return api.cbot.getResponse(originalStr);
  }

};


module.exports = handler;