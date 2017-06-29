//HTML ELEMENTS FOR DISPLAYING RESPONSE AND INFO JSON's
var jsonElet = document.getElementById("responseJSON");
var infoElet = document.getElementById("infoJSON");

var clientID = "F9_-nNkqfW0GYzyg_h8i4w==";

//REQUEST INFO JSON
//see https://houndify.com/reference/RequestInfo
var requestInfo = {
  ClientID: clientID,
  UserID: "test_user",
  Latitude: 37.388309,
  Longitude: -121.973968
};


//INITIALIZE HOUNDIFY CLIENT
var myClient = new Houndify.HoundifyClient({

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

  //Listeners

  //Fires after server responds with Response JSON
  //Info object contains useful information about the completed request
  //See https://houndify.com/reference/HoundServer
  onResponse: function(response, info) {
    if (response.AllResults && response.AllResults[0] !== undefined) {
      jsonElet.value = response.stringify(undefined, 2);
      jsonElet.parentNode.hidden = false;
      infoElet.value = JSON.stringify(info, undefined, 2);
      infoElet.parentNode.hidden = false;
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


//TEXT SEARCH TEST
function textQuery() {
  var query = document.getElementById('query').value;
  myClient.textSearch.query(query, requestInfo);
  jsonElet.parentNode.hidden = true;
  infoElet.parentNode.hidden = true;
}


//MIC VOICE SEARCH TEST
function startStopVoiceSearch() {
  if (myClient.voiceSearch.isStreaming()) {
    //stops streaming voice search requests, expects the final response from backend
    myClient.voiceSearch.stop();
  } else {
    myClient.voiceSearch.startRecording(requestInfo);
    //starts streaming of voice search requests to Houndify backend
    document.getElementById("voiceIcon").className = "loading circle notched icon big";
    document.getElementById("textSearchButton").disabled = true;
    document.getElementById("query").readOnly = true;
    jsonElet.parentNode.hidden = true;
    infoElet.parentNode.hidden = true;
  }
}


//FILE VOICE SEARCH TEST
function onFileUpload() {
  var file = document.getElementById("file").files[0];
  if (!file) return;

  var reader = new FileReader();
  reader.onload = function() {
    //In browsers only you can also upload and decode
    //audio file using decodeArrayBuffer() method
    var arrayBuffer = reader.result;
    myClient.voiceSearch.decodeArrayBuffer(arrayBuffer, function(audio) {

      //Stream 8/16 kHz mono 16-bit little-endian PCM samples
      //in Int16Array() chunks to backend
      //Pass in original sample rate as the second argument to startStreaming()
      //and the audio will be resampled down to 8000 or 16000.
      //works in Node.js and browser
      myClient.voiceSearch.startStreaming(requestInfo, 16000);
      myClient.voiceSearch.write(audio);
      myClient.voiceSearch.stop();
    });

    jsonElet.parentNode.hidden = true;
    infoElet.parentNode.hidden = true;
  };

  reader.readAsArrayBuffer(file);
  document.getElementById("query").value = "...";
}
