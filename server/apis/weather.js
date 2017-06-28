const request = require('request-promise');

const weather = (location) => {
  let options = {
    uri: 'api.openweathermap.org/data/2.5/weather?lat=' + location.lat + '&lon=' + location.lon,
    headers: {
        'User-Agent': 'Request-Promise',
        'x-api-key': process.env.weather_api_key
    },
    json: true // Automatically parses the JSON string in the response
};
  request(options)
  .then( (weatherData) => {
    return weatherData;
  })
  .catch( (err) => {
    console.error('error', err);
  })
  // make a get request to this URL
  // api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}

}

module.exports = weather;