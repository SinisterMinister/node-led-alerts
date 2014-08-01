var Canvas = require('openvg-canvas'),
	LEDMatrix = new require('pi-led-matrix')(),
	AnimationLoop = require('./lib/animation-loop'),
	path = require('path'),
	fs = require('fs'),
    canvas = new Canvas(128, 32),
    ctx = canvas.getContext('2d'),
    w = canvas.width, h = canvas.height;


// Register the fonts
Canvas.Text.registerFont('small-font', __dirname+'/small-font.ttf');

// Load a new instance of the alert
var alert = new require('./lib/canvas/alert')(ctx);

/**
 * This is the callback that puts stuff into the canvas and renders to the matrix
 */
function draw () {
	// Render the canvas to the matrix
	LEDMatrix.setPixels(ctx.getImageData(0, 0, w, h).data);
}

// Add the draw function to the loop register
AnimationLoop.register('canvasDrawer', draw);

// Start the animation loop
AnimationLoop.start();


//// HAPI server
//
//var Hapi    = require('hapi'); 		// call express
//var server = Hapi.createServer('0.0.0.0', parseInt(process.env.PORT, 10) || 3000);
//
//// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
//server.route({
//  method: 'GET'
//, path: '/'
//, handler: function(req, reply) {
//    reply('Server is running!');
//  }
//});
//
//
//server.route({
//  method: 'POST'
//, path: '/message'
//, config: {
//    handler: function(req, reply) {
//      var message = {
//        status: req.payload.status
//      , text: req.payload.text
//      , system: req.payload.system
//      };
//      var status = req.payload.status;
//      var system = req.payload.system;
//      var text = req.payload.text;
//      //quotes.push(newQuote);
//      console.log("Message received:");
//      console.log("Text: " + text);
//      console.log("Status: " + status);
//      console.log("System: " + system);
//      // Call node-led-alerts here
//      //node-led-alerts.draw(status, text);
//    }
//  }
//});
//
//server.start();