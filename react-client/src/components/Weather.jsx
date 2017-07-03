import React from 'react';

const Weather = ({response}) => {
  const fahrenheitStyle = {fontSize: '40px'};
  const spanStyle = {width: '100px', marginRight:'20px', fontSize: '20px'};
  return (
    <div>
      <p>{response.text}</p>
      <p style={fahrenheitStyle}>{Math.round(9/5 * (response.data.main.temp - 273) + 32)} &#8457;</p>
      <p>
        <span style={spanStyle}>{response.data.weather[0].main}</span>
        <span style={spanStyle}>Wind: {response.data.wind.speed}mph</span>
      </p>
    </div>
  );
};

export default Weather;