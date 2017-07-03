import React from 'react';
import { DefaultPlayer as Video } from 'react-html5video';

const EasterEgg = ({response}) =>  {
  return (
    <div>
      <p>{response.text}</p>
      <Video autoPlay controls={[]}>
        <source src="./libs/easter-con480.mp4" type="video/mp4" />
        }
      </Video>
    </div>
  );
}

export default EasterEgg;

