const db = require('../db-config.js');
const _ = require('underscore');

const Words = {


  getAllWords: () => {
    return db.query('select * from words');
  },

  getWordsApiMatch: () => {
    let query = `select w.word, a.name as "api" from words w inner join apis a on (a.id = w.api_id)`;
    return db.query(query)
            .then((data) => {
              return Words.convertWordsApiData(data);
            });
  },

  getApiFromWord: (word) => {
    let query = `select w.word, a.name as "api" from words w inner join apis a on (a.id = w.api_id) where w.word LIKE '%${word}%'`;
    
    return db.query(query);
  },
  

  convertWordsApiData: (data) => {

    let obj = {}

    data.forEach((match) => {
      obj[match.word] = match.api;
    })

    return obj;

  },

  getWeatherString: (weatherObj) => {



    let clouds = weatherObj.clouds.all;
    let place = weatherObj.name;
    let wind = weatherObj.wind.speed;
    let description = weatherObj.weather[0].description.split(' ');


    let skyLogic = clouds > 30 ? `It looks pretty cloudy outside. Clouds at ${clouds}% in ${place}.` : `It looks like the sky is all clear. Clouds at ${clouds}% in ${place}`;

    let rainLogic = _.contains(description, 'rain') || _.contains(description, 'thunderstorm') ?  `Looks like it's raining in ${place}.` : `No rain in ${place} today.`;


    let windLogic = wind > 5 ? `It's windy outside. Don't get blown away. Wind speed at ${wind} in ${place}` : `Don't worry about the wind today. Wind speed at ${wind} in ${place}`;

    let weatherLogic = {
      'sunny': skyLogic,
      'sun': skyLogic,
      'cloudy': skyLogic,
      'cloud': skyLogic,
      'clouds': skyLogic,
      'rain': rainLogic,
      'raining': rainLogic,
      'rainy' : rainLogic,
      'windy': windLogic,
      'wind': windLogic,
    }
    
    return weatherLogic;
    
  }


};


module.exports = Words;
