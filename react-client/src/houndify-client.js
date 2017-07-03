import client_env from './client_env.js';
import $ from 'jquery';
const clientID = client_env.client_env.houndify_clientID;

module.exports.houndifyClient = (location, handleServerResponse, setMicState, setLoadingState) => {
  return {
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
        let customResponse = {};
        customResponse.RawTranscription = response.AllResults[0].RawTranscription;
        customResponse.WrittenResponseLong = response.AllResults[0].WrittenResponseLong;
        customResponse.location = location;
        console.log(customResponse.WrittenResponseLong);
        // Easter egg request is handled in client side
        if (customResponse.WrittenResponseLong.toLowerCase().includes('dance')) {
          console.log('Marcus Dance!!!');
          handleServerResponse(null, {type: "text", api: "easteregg", text: "Marcus Dance!!!"});
        } else {
          // Send voice result to server
          setLoadingState();
          $.ajax({
            url: '/voice',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(customResponse),
            success: (data) => {
              console.log('voice query response from server: ', data);
              handleServerResponse(null, data);
            },
            error: (err) => {
              console.log('err', err);
              handleServerResponse(err, null);
            }
          });
        }
      }
    },

    //Fires if error occurs during the request
    onError: function(err, info) {
      document.getElementById("voiceIcon").className = "unmute huge icon";
    },

    //Fires every time backend sends a speech-to-text
    //transcript of a voice query
    //See https://houndify.com/reference/HoundPartialTranscript
    onTranscriptionUpdate: function(trObj) {
      var transcriptElt = document.getElementById("query");
      transcriptElt.value = trObj.PartialTranscript;
      document.getElementById("query").innerHTML = trObj.PartialTranscript;
    },

    //Fires after abort() method is called on search object
    onAbort: function(info) {},

    //Fires when start() metods is called on search object
    onRecordingStarted: function() {
      document.getElementById("voiceIcon").className = "selected radio icon huge red";
    },

    //Fires when recording ends either after stop(), abort() or
    //when server detects the end of query and responds
    //(VAD: https://houndify.com/docs#voice-activity-detection)
    onRecordingStopped: function() {
      document.getElementById("voiceIcon").className = "unmute huge icon";
      setMicState();

      document.getElementById("voiceIcon").className = "unmute huge icon";
      // document.getElementById("textSearchButton").disabled = false;
      // document.getElementById("query").readOnly = false;
    },

    //Fires every time new audio frame of recording is captured
    onAudioFrame: function(frame) {}
  };
};