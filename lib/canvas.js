var Canvas = require('openvg-canvas'),
	argv = require('yargs').argv,
	LEDMatrix = new require('pi-led-matrix')(),
	AnimationLoop = require('./animation-loop'),
	canvas = new Canvas(128, 32);

var led = argv.led || 'on';

module.exports = canvas;

// Register the fonts
Canvas.Text.registerFont('small-font', __dirname+'/../small-font.ttf');

/**
 * This is the callback that renders to the matrix
 */
function draw () {
	// Render the canvas to the matrix
	if (led === 'on')
		LEDMatrix.setPixels(canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data);
}

// Add the draw function to the loop register
AnimationLoop.register('canvasDrawer', draw);

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
