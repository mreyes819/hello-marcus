import React from 'react';

const DefaultContent = ({response}) =>  {
  let divStyle = {width: '400px'};
  return (
    <div>
      <div className="image">
        <img src="./libs/marcus_finger.jpg" style={divStyle} />
      </div>
      <div className="content">
        <a className="header">Marcus</a>
        <div className="meta">
          <span className="date">Joined in 2013</span>
        </div>
        <div className="description">
          Kristy is an art director living in New York.
        </div>
      </div>
      <div className="extra content">
        <a>
          <i className="user icon"></i>
          22 Friends
        </a>
      </div>
    </div>
  );
}

export default DefaultContent;


