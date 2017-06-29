const api = require('./apis');

// handler takes 2 arguments, which API to call and the parameters to call it with
const handler = (apiName, params) => api[apiName](params);

module.exports = handler;