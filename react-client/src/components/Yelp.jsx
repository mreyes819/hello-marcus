import React from 'react';

const Yelp = ({response}) => {
  return (

  <div className="item" style={{fontFamily:'verdana'}}>
    <a target="_blank" href={response.data.website} className="ui medium image">
      <img src={response.data.image}></img>
    </a>
    <div className="content">
      <p className="header">{response.data.name}</p>
      <div className="description">
        <p>Reviews: {response.data.numReviews}</p>
        <p>Rating: {response.data.rating}</p>
      </div>
    </div>
  </div>

  );
};

export default Yelp;