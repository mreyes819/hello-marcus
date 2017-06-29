import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import Utils from './utils.js';
// import fs from 'fs';
// import dotenv from 'dotenv';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      replies: []
    };
    // dotenv.config();
    this.requestInfo = {
      ClientID: 'F9_-nNkqfW0GYzyg_h8i4w==',
      UserID: "test_user",
      Latitude: 37.388309,
      Longitude: -121.973968
    };

    var jsonElet = document.getElementById("responseJSON");

    this.myClient = new Houndify.HoundifyClient({

      //Your Houndify Client ID
      clientId: clientID,

      //You need to create an endpoint on your server
      //for handling the authentication.
      //See SDK's server-side method HoundifyExpress.createAuthenticationHandler().
      authURL: "/houndifyAuth",

      //For testing environment you might want to authenticate on frontend without Node.js server.
      //In that case you may pass in your Houndify Client Key instead of "authURL".
      //clientKey: "YOUR_CLIENT_KEY",

      //Enable Voice Activity Detection
      //Default: true
      enableVAD: true,

      //You need to create an endpoint on your server
      //for handling the authentication and proxying
      //text search http requests to Houndify backend
      //See SDK's server-side method HoundifyExpress.createTextProxyHandler().
      textSearchProxy: {
        url: "/textSearchProxy",
        method: "POST",
        // headers: {}
        // ... More proxy options will be added as needed
      },
      onResponse: function(response, info) {
        if (response.AllResults && response.AllResults[0] !== undefined) {
          // Send voice result to server
          $.ajax({
            url: '/voiceResult',
            method: 'POST',
            contentType: 'application/json',
            data: response.stringify(undefined, 2),
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
      },

      //Fires if error occurs during the request
      onError: function(err, info) {
        jsonElet.parentNode.hidden = true;
        infoElet.value = JSON.stringify(info, undefined, 2);
        infoElet.parentNode.hidden = false;
        document.getElementById("voiceIcon").className = "unmute big icon";
      },

      //Fires every time backend sends a speech-to-text
      //transcript of a voice query
      //See https://houndify.com/reference/HoundPartialTranscript
      onTranscriptionUpdate: function(trObj) {
        var transcriptElt = document.getElementById("query");
        transcriptElt.value = trObj.PartialTranscript;
      },

      //Fires after abort() method is called on search object
      onAbort: function(info) {},

      //Fires when start() metods is called on search object
      onRecordingStarted: function() {
        document.getElementById("voiceIcon").className = "selected radio icon big red";
      },

      //Fires when recording ends either after stop(), abort() or
      //when server detects the end of query and responds
      //(VAD: https://houndify.com/docs#voice-activity-detection)
      onRecordingStopped: function() {
        document.getElementById("voiceIcon").className = "unmute big icon";
        document.getElementById("textSearchButton").disabled = false;
        document.getElementById("query").readOnly = false;
      },

      //Fires every time new audio frame of recording is captured
      onAudioFrame: function(frame) {}
    });
  }

  componentDidMount() {
    // ask user for location on page load
    Utils.location();
  }

  startStopVoiceSearch() {
    if (this.myClient.voiceSearch.isStreaming()) {
      //stops streaming voice search requests, expects the final response from backend
      this.myClient.voiceSearch.stop();
    } else {
      this.myClient.voiceSearch.startRecording(this.requestInfo);
      //starts streaming of voice search requests to Houndify backend
      document.getElementById("voiceIcon").className = "loading circle notched icon big";
      document.getElementById("textSearchButton").disabled = true;
      document.getElementById("query").readOnly = true;
    }
  }

  textQuery() {
    var query = document.getElementById('query').value;
    console.log(query);
    $.ajax({
      url: '/textResult',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({query: query}),
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
        <div className="ui center aligned basic segment container">
          <form id="form" className="ui form" action="javascript:void(0);">
            <div className="ui action big labeled fluid input field">
              <div className="ui icon basic label button" onClick= {this.startStopVoiceSearch.bind(this)}>
                <i id="voiceIcon" className="unmute big icon"></i>
              </div>
              <input id="query" type="text" placeholder="Click on a microphone icon or type in your query" />
              <button id="textSearchButton" className="ui icon button" onClick= {this.textQuery.bind(this)}>
                 <i className="search big icon"></i>
              </button>
            </div>
            <div className="ui field" hidden>
              <label>Response object</label>
              <textarea id="responseJSON"></textarea>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));