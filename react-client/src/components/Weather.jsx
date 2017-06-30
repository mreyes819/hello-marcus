import React from 'react';

const Weather = ({response}) => (
  <div>
    <div>{response.text}</div>
    <div>{ Math.round(9/5 * (response.data.main.temp - 273) + 32)} degree Celcius</div>
    <div>{response.data.weather[0].main} Wind: {response.data.wind.speed}mph</div>
  </div>
);

export default Weather;