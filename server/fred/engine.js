const nlp = require('compromise');
const model = require('../../database-postgres/models/index.js');
const apiHandler = require('../apihandler');
const parseTools = require('./parseTools');

const response = (str = "is there fog today?", loc = '{"lat":"37.7837039","lon":"-122.4091297"}') => {

  let place = parseTools.findPlace(str);

  return model.words.getWordsApiMatch()
    .then((data) => {
      return parseTools.findMatch(str, data);
    })
    .then((api) => {
      return apiHandler(api, loc, place, str);
    });

};

module.exports = response;