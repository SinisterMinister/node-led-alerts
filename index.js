var Canvas = require('openvg-canvas'),
	LEDMatrix = new require('pi-led-matrix')(),
	AnimationLoop = require('./lib/animation-loop'),
	path = require('path'),
	fs = require('fs'),
    canvas = new Canvas(128, 32),
    ctx = canvas.getContext('2d'),
    w = canvas.width, h = canvas.height,
	frame = 0;


// Register the fonts
Canvas.Text.registerFont('small-font', __dirname+'/small-font.ttf');

// Load the icons
var warnIcon = new Canvas.Image();
warnIcon.src = fs.readFileSync(__dirname+'/images/warning_ffff00_20.png');

/**
 * This is the callback that puts stuff into the canvas and renders to the matrix
 */
function draw () {
	// Get the framerate
	frameRate = AnimationLoop.getFrameRate().toString();

	// Increment the frame count
	frame++;

	// Clear the canvas
	ctx.clearRect(0, 0, w, h);

	// Set the backgroud to black
	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, w, h);

	ctx.drawImage(warnIcon, 2, 6);

	// Set the font to 6px
	ctx.font = "6px small-font";

	// Set the text fill to the gradient and write the text
	ctx.fillStyle = 'white';
	ctx.fillText("Course Structure API", 24, 7);

	var text = "10.199.252.102 is down!",
		textWidth = ctx.measureText(text).width;


	ctx.fillText(text, 24, 15);
	ctx.fillText(text, 24, 23);
	ctx.fillText(text, 24, 31);

	// Render the canvas to the matrix
	LEDMatrix.setPixels(ctx.getImageData(0, 0, w, h).data);

	Canvas.vgSwapBuffers();
}

// Add the draw function to the loop register
AnimationLoop.register('canvasDrawer', draw);

// Start the animation loop
AnimationLoop.start();


// HAPI server

var Hapi    = require('hapi'); 		// call express
var server = Hapi.createServer('0.0.0.0', parseInt(process.env.PORT, 10) || 3000);

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
server.route({
  method: 'GET'
, path: '/'
, handler: function(req, reply) {
    reply('Server is running!');
  }
});


server.route({
  method: 'POST'
, path: '/message'
, config: {
    handler: function(req, reply) {
      var message = {
        status: req.payload.status
      , text: req.payload.text
      , system: req.payload.system
      };
      var status = req.payload.status;
      var system = req.payload.system;
      var text = req.payload.text;
      //quotes.push(newQuote);
      console.log("Message received:");
      console.log("Text: " + text);
      console.log("Status: " + status);
      console.log("System: " + system);
      // Call node-led-alerts here
      //node-led-alerts.draw(status, text);
    }
  }
});
	
server.start();