import React from 'react';

const Weather = ({response}) => {
  let divStyle = {width: '400px'};
  return (
  <div>
    <div className="image">
      <img src="./libs/marcus_finger.jpg" style={divStyle} />
    </div>
    <div className="content">
      <a className="header">{response.text}</a>
      <div className="description">
        <div>{ Math.round(9/5 * (response.data.main.temp - 273) + 32)} degree Celcius</div>
        <div>{response.data.weather[0].main} Wind: {response.data.wind.speed}mph</div>
      </div>
    </div>
  </div>
  );
};

export default Weather;