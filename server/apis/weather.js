const request = require('request-promise');
require('dotenv').config();

const weather = (loc) => {
  new Promise ((resolve, reject) => {
    console.log(typeof loc);
    let crd = JSON.parse(loc)
    console.log('CRDDDDDDDDD', crd);
    let options = {
      uri: 'http://api.openweathermap.org/data/2.5/weather?lat=' + crd.lat + '&lon=' + crd.lon,
      method: 'GET',
      headers: {
        'User-Agent': 'Request-Promise',
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-api-key': process.env.weather_api_key
      }
    };
    request(options)
    .then( (weatherData) => {
      console.log(weatherData)
      resolve(weatherData);
    })
    .catch( (err) => {
      reject(err);
    });
  })
  // make a get request to this URL
  // api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}
}

module.exports = weather;