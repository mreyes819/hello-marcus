import React from 'react';
import Cleverbot from './Cleverbot.jsx';

const ResponseCard = ({response}) => {
  if(response.api === "cleverbot") {
    return(
      <Cleverbot response={response} />
    );
  }
}

export default ResponseCard;