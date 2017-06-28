const api = require('./apis');

const handler = (apiName) => api[apiName]();

module.exports = handler;