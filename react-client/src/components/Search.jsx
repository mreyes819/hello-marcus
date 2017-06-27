import React from 'react';

const Search = ({handleVoiceSubmit}) => (
  <div>
    <button type="submit" value="Submit" onClick={() => handleVoiceSubmit()}>
      Voice Button
    </button>
  </div>
)

export default Search;