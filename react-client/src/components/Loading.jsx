import React from 'react';

const Loading = ({response}) =>  {
  return (
    <div>
      <p>{response.text}</p>
      <div className="ui active inline loader"></div>
    </div>
  );
}

export default Loading;

