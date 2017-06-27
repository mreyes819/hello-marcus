import React from 'react';
import $ from 'jquery';

const Search = ({handleVoiceSubmit}) => (
  <div>
    <button type="submit" value="Submit" onClick={() => handleVoiceSubmit($('input').val())}>
      Voice Button
    </button>
  </div>
)

export default Search;