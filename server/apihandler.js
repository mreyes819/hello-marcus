const api = require('./apis');

// handler takes 4 arguments, which API, current location object, place str if any, original user string
const handler = (apiName, loc, placeStr, originalStr) => { 
  if (apiName) {
    return api[apiName].getResponse(loc, placeStr);
  } else {
    return api.cbot.getResponse(originalStr);
  }

};


module.exports = handler;