import React from 'react';
import DefaultContent from './Default.jsx';
import Cleverbot from './Cleverbot.jsx';
import Weather from './Weather.jsx';

const ResponseCard = ({response}) => {
  let ElementName;
  let divStyle = {width: '400px', marginTop: '100px'};
  //default state: before making any request
  if(response.api === "default") {
    ElementName = DefaultContent;
  } else if(response.api === "cleverbot") {
    ElementName = Cleverbot;
  } else if (response.api === "weather") {
    ElementName = Weather;
  }

  return(
    <div className="ui card" style={divStyle}>
      <ElementName response={response} />
    </div>
  );
}

export default ResponseCard;