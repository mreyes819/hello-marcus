import React from 'react';

const Yelp = ({response}) => {
  return (
    <div>
      <p>{response.text}</p>
      <img className='ui medium image center align' src={response.data.image}></img>
      <p>{response.data.name}</p>
      <p>Reviews: {response.data.numReviews}</p>
      <p>Rating: {response.data.rating}</p>
    </div>
  );
};

export default Yelp;