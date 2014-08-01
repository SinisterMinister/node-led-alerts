var Canvas = require('openvg-canvas'),
	LEDMatrix = new require('pi-led-matrix')(),
	AnimationLoop = require('./lib/animation-loop'),
    canvas = new Canvas(128, 32),
    ctx = canvas.getContext('2d'),
    w = canvas.width, h = canvas.height,
	frame = 0;


/**
 * This is the callback that puts stuff into the canvas and renders to the matrix
 */
function draw () {
	// Get the framerate
	frameRate = AnimationLoop.getFrameRate().toString();
	
	// Clear the canvas
	ctx.clearRect(0, 0, w, h);

	// Set the backgroud to black
	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, w, h);

	// Set the font to 8px
	ctx.font = "8px monospace";

	// Build a gradient for the text
	var gradient=ctx.createLinearGradient(0,0,w,0);
	gradient.addColorStop("0","red");
	gradient.addColorStop("0.5","white");
	gradient.addColorStop("1.0","blue");

	// Set the text fill to the gradient and write the text
	ctx.fillStyle = gradient;
	ctx.fillText("FPS: "+frameRate, 10, 14);
	ctx.fillText("Frame: "+frame.toString(), 10, 30);

	// Render the canvas to the matrix
	LEDMatrix.setPixels(ctx.getImageData(0, 0, w, h).data);
}

// Add the draw function to the loop register
AnimationLoop.register('canvasDrawer', draw);

// Start the animation loop
AnimationLoop.start();