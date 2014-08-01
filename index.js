var Canvas = require('openvg-canvas'),
	LEDMatrix = new require('pi-led-matrix')(),
	AnimationLoop = require('./lib/animation-loop'),
    canvas = new Canvas(128, 32),
    ctx = canvas.getContext('2d'),
    w = canvas.width, h = canvas.height,
	frame = 0,
	frameRate = "NA",
	typedData;

function draw () {
	if (frame++ % 100 === 0) {

		ctx.fillStyle = 'black';
		ctx.fillRect(0, 0, w, h);

		ctx.font = "6px sans-serif";

		var gradient=ctx.createLinearGradient(0,0,w,0);
		gradient.addColorStop("0","magenta");
		gradient.addColorStop("0.5","blue");
		gradient.addColorStop("1.0","red");

		// Fill with gradient
		ctx.fillStyle = gradient;
		ctx.fillText("The quick brown fox jumps over the lazy dog".toLowerCase(), 10, 14);
		ctx.fillText("The quick brown fox jumps over the lazy dog".toUpperCase(), 10, 30);

		typedData = ctx.getImageData(0, 0, w, h).data;
	}

//	// Convert to regular array
//	for (var i = typedData.length - 1; i >= 0; i--) {
//		data.push(typedData[i]);
//	}

	LEDMatrix.setPixels(typedData);
}

AnimationLoop.register('canvasDrawer', draw);
AnimationLoop.start();