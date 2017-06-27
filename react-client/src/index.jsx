import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      replies: []
    }
  }

  handleVoiceSubmit() {
    console.log('Handling voice...');
    //Make Houndify API call

    //Create obj to test if we can pass result to Node server
    var obj = {test: "test"};
    $.ajax({
      url: '/voice',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(obj),
      success: (data) => {
        this.setState({
          replies: data
        });
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  render () {
    return (
      <div>
        <Search handleVoiceSubmit = {this.handleVoiceSubmit.bind(this)}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));