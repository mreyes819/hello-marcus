const nlp = require('compromise');
const model = require('../../database-postgres/models/index.js');
const apiHandler = require('../apihandler');
const parseTools = require('./parseTools');


// let str = nlp("facebook.com");

// let testStr = "Is there toilet paper?";
// let placeStr = '';

// let loc = '{"lat":"37.7837039","lon":"-122.4091297"}';


const response = (str = "is there fog today?", loc = '{"lat":"37.7837039","lon":"-122.4091297"}') => {

  return model.words.getWordsApiMatch()
    .then((data) => {
      return parseTools.findMatch(str, data);
    })
    .then((api) => {
      return apiHandler(api, loc, str);
    });

};

module.exports = response;






//run string through algo
  //if algo returns an empty array
    //call the clever bot api
  //if algo returns an api
    //call api

