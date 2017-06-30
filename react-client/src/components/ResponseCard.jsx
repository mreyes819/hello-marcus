import React from 'react';
import Cleverbot from './Cleverbot.jsx';
import Weather from './Weather.jsx';

const ResponseCard = ({response}) => {
  if(response.api === "cleverbot") {
    return (
      <Cleverbot response={response} />
    );
  } else if (response.api === "weather") {
    return (
      <Weather response={response} />
    );
  }
}

export default ResponseCard;