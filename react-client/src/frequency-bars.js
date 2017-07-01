 module.exports = function() {

  var constraints = window.constraints = {
      audio: true,
      video: false
    };

    function handleSuccess(stream) {

      var audioTracks = stream.getAudioTracks();
      // console.log('Got stream with constraints:', constraints);
      // console.log('Using audio device: ' + audioTracks[0].label);
      stream.oninactive = function() {
        // console.log('Stream ended');
      };
      window.stream = stream; // make variable available to browser console
      var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      var analyser = audioCtx.createAnalyser();

      analyser.minDecibels = -90;
      analyser.maxDecibels = -10;
      analyser.smoothingTimeConstant = 0.85;

      var distortion = audioCtx.createWaveShaper();
      var gainNode = audioCtx.createGain();
      var biquadFilter = audioCtx.createBiquadFilter();
      var convolver = audioCtx.createConvolver();


      var source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);
      analyser.connect(distortion); 
      source.connect(analyser);
      analyser.connect(distortion);
      distortion.connect(biquadFilter);
      biquadFilter.connect(convolver);
      convolver.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      analyser.fftSize = 256;
      var bufferLength = analyser.frequencyBinCount;
      var dataArray = new Float32Array(bufferLength);

      var canvas = document.querySelector('.visualizer');
      var canvasCtx = canvas.getContext("2d");

      var intendedWidth = document.querySelector('.wrapper').clientWidth;

      canvas.setAttribute('width',intendedWidth);

      canvas.setAttribute('width', 900);

      canvasCtx.clearRect(0, 0, 200, 200);

      var drawVisual;

      function draw() {

        var WIDTH = canvas.width;
        var HEIGHT = canvas.height;
        drawVisual = requestAnimationFrame(draw);

        analyser.getFloatFrequencyData(dataArray);

        canvasCtx.fillStyle = 'rgb(255, 255, 255)';
        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

        var barWidth = (WIDTH / bufferLength) * 1;
        var barHeight;
        var x = 0;

        for (var i = 0; i < bufferLength; i++) {
          barHeight = (dataArray[i] + 140)*1;
          
          canvasCtx.fillStyle = 'rgb(' + Math.floor(barHeight) + ',0,0)';
          canvasCtx.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight/2);

          x += barWidth + 1;
        }
      }

      draw();
    }

    function handleError(error) {
      console.log('navigator.getUserMedia error: ', error);
    }

    navigator.mediaDevices.getUserMedia(constraints).
        then(handleSuccess).catch(handleError);


 };

  
