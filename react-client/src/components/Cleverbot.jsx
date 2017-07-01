import React from 'react';

const Cleverbot = ({response}) => {
  let divStyle = {width: '400px'};
  return (
  <div>
    <div className="image">
      <img src="./libs/marcus_finger.jpg" style={divStyle} />
    </div>
    <div className="content">
      <a className="header">{response.text}</a>
      <div className="description">
      </div>
    </div>
  </div>
  );
};

export default Cleverbot;