var Canvas = require('openvg-canvas'),
	AnimationLoop = require('./lib/animation-loop'),
    canvas = new Canvas(32, 128),
    ctx = canvas.getContext('2d'),
    w = canvas.width, h = canvas.height,
	frame = 0,
	frameRate = "NA";



function draw () {
	if (frame++ % 1000 === 0) {
		frameRate = AnimationLoop.getFrameRate().toString()
	}

	ctx.clearRect(0, 0, w, h);

	ctx.font = "16px sans-serif";

	var gradient=ctx.createLinearGradient(0,0,w,0);
	gradient.addColorStop("0","magenta");
	gradient.addColorStop("0.5","blue");
	gradient.addColorStop("1.0","red");

	// Fill with gradient
	ctx.fillStyle = gradient;
	ctx.fillText(frameRate, 10, 20);
}

AnimationLoop.register('canvasDrawer', draw);
AnimationLoop.start();