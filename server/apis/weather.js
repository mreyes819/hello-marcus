const request = require('request-promise');

const weather = {

  getWeather: (loc) => {
    let coordinates = JSON.parse(loc)
    let options = {
      uri: 'http://api.openweathermap.org/data/2.5/weather?lat=' + coordinates.lat + '&lon=' + coordinates.lon,
      method: 'GET',
      headers: {
        'User-Agent': 'Request-Promise',
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-api-key': `${process.env.weather_api_key}`
      }
    };
    return request(options);
  }
};

module.exports = weather;