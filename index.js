var Canvas = require('openvg-canvas'),
	LEDMatrix = new require('pi-led-matrix')(),
	AnimationLoop = require('./lib/animation-loop'),
    canvas = new Canvas(128, 32),
	Alert = require('./lib/canvas/alert'),
	Pacman = require('./lib/canvas/pacman'),
    w = canvas.width, h = canvas.height;


// Register the fonts
Canvas.Text.registerFont('small-font', __dirname+'/small-font.ttf');

// Load a new instance of the alert
//var alert = new Alert(canvas);
var pacman = new Pacman(canvas);
/**
 * This is the callback that puts stuff into the canvas and renders to the matrix
 */
function draw () {
	// Render the canvas to the matrix
	LEDMatrix.setPixels(canvas.getContext('2d').getImageData(0, 0, w, h).data);
}

// Add the draw function to the loop register
AnimationLoop.register('canvasDrawer', draw);

// Start the animation loop
AnimationLoop.start();

process.on('exit', function () {
	AnimationLoop.stop();

	// Black out the LEDs
	var length = canvas.width * canvas.height * 4,
		data = new Uint8Array(length);

	for (var i = 0; i < length; i++) {
		data[i] = 0x00;
	}

	LEDMatrix.setPixels(data);

	process.nextTick(function () {
		console.info('Shutting down...');
	})
});
