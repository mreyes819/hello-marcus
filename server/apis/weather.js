const request = require('request-promise');
require('dotenv').config();

const weather = {

  getResponse: (loc, placeStr) => {
    if(!placeStr) {
      let coordinates = JSON.parse(loc);
      var query = 'http://api.openweathermap.org/data/2.5/weather?lat=' + coordinates.lat + '&lon=' + coordinates.lon;
    } else {
      query = 'http://api.openweathermap.org/data/2.5/weather?q=' + placeStr;
    }
    console.log(`${process.env.weather_api_key}`)
    var options = {
      uri: query,
      method: 'GET',
      headers: {
        'User-Agent': 'Request-Promise',
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-api-key': `${process.env.weather_api_key}`
      }
    };
    request(options)
    .then((data) => {
      let apiResponse = {
        type: 'widget',
        api: 'weather',
        data: JSON.parse(data)
      };
      console.log(apiResponse)
      return apiResponse;
    })
  }
};

weather.getResponse('{"lat":"37.7837039","lon":"-122.4091297"}', 'London');

module.exports = weather;