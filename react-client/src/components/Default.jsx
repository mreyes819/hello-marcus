import React from 'react';

const DefaultContent = ({response}) =>  {
  const divStyle = {width: '400px'};
  return (
    <p>{response.text}</p>
  );
}

export default DefaultContent;



