import React from 'react';

const Cleverbot = ({response}) => {
  const divStyle = {width: '400px'};
  return (
    <p>{response.text}</p>
  );
};

export default Cleverbot;