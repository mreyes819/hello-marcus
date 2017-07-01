const request = require('request-promise');
const fredTools = require('../fred/parseTools');
require('dotenv').config();


const weather = {

  getResponse: (loc, placeStr, originalStr) => {

    console.log('ran weather');
    let query = null
    if(!placeStr) {
      query = 'http://api.openweathermap.org/data/2.5/weather?lat=' + loc.lat + '&lon=' + loc.lon;
    } else {
      query = 'http://api.openweathermap.org/data/2.5/weather?q=' + placeStr;
    }
    let options = {
      uri: query,
      method: 'GET',
      headers: {
        'User-Agent': 'Request-Promise',
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-api-key': `${process.env.weather_api_key}`
      }
    };
   
   return request(options)
    .then((data) => {

      let weatherObj = JSON.parse(data);

      let response = fredTools.constructWeathertext(originalStr, weatherObj);

      let apiResponse = {
        type: 'widget',
        api: 'weather',
        text: response,
        data: weatherObj
      };
      return apiResponse;
    })
  }
};

module.exports = weather;