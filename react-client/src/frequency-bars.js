 module.exports.bars = (that) => {

    console.log('top level', this);



    let constraints = window.constraints = {
      audio: true,
      video: false
    };

      function handleSuccess(stream) {

        let audioTracks = stream.getAudioTracks();
        // console.log('Got stream with constraints:', constraints);
        // console.log('Using audio device: ' + audioTracks[0].label);
        stream.oninactive = function() {
          // console.log('Stream ended');
        };
        window.stream = stream; // make variable available to browser console
        let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        let analyser = audioCtx.createAnalyser();

        analyser.minDecibels = -90;
        analyser.maxDecibels = -10;
        analyser.smoothingTimeConstant = 0.85;

        let distortion = audioCtx.createWaveShaper();
        let gainNode = audioCtx.createGain();
        let biquadFilter = audioCtx.createBiquadFilter();
        let convolver = audioCtx.createConvolver();


        let source = audioCtx.createMediaStreamSource(stream);
        source.connect(analyser);
        analyser.connect(distortion); 
        source.connect(analyser);
        analyser.connect(distortion);
        distortion.connect(biquadFilter);
        biquadFilter.connect(convolver);
        convolver.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        analyser.fftSize = 256;
        let bufferLength = analyser.frequencyBinCount;
        let dataArray = new Float32Array(bufferLength);

        let canvas = document.querySelector('.visualizer');
        let canvasCtx = canvas.getContext("2d");

        let intendedWidth = document.querySelector('.wrapper').clientWidth;

        canvas.setAttribute('width',intendedWidth);

        canvas.setAttribute('width', 900);

        canvasCtx.clearRect(0, 0, 200, 200);

        let drawVisual;

        function draw() {

          let WIDTH = canvas.width;
          let HEIGHT = canvas.height;

          if (that.state.micOn) {
            drawVisual = requestAnimationFrame(draw);
          } 

          analyser.getFloatFrequencyData(dataArray);

          canvasCtx.fillStyle = 'rgb(255, 255, 255)';
          canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

          let barWidth = (WIDTH / bufferLength) * 1;
          let barHeight;
          let x = 0;

          if (that.state.micOn) {
            for (let i = 0; i < bufferLength; i++) {
              barHeight = (dataArray[i] + 140)*1;
              
              canvasCtx.fillStyle = 'rgb(' + Math.floor(barHeight) + ',0,0)';
              canvasCtx.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight/2);

              x += barWidth + 1;

            } 


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

  
