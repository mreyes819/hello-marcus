import React from 'react';

const DefaultContent = ({response}) =>  {
  const paragraphStyle = {width: '270px'};
  return (
    <p style={paragraphStyle}>{response.text}</p>
  );
}

export default DefaultContent;



