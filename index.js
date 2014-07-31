var Canvas = require('openvg-canvas'),
	AnimationLoop = require('./lib/animation-loop'),
    canvas = new Canvas(128, 32),
    ctx = canvas.getContext('2d'),
    w = canvas.width, h = canvas.height,
	frameRate = 0;



function draw () {
	console.info(AnimationLoop.getFrameRate());

	ctx.clearRect(0, 0, w, h);

	ctx.font = "16px sans-serif";

	var gradient=ctx.createLinearGradient(0,0,w,0);
	gradient.addColorStop("0","magenta");
	gradient.addColorStop("0.5","blue");
	gradient.addColorStop("1.0","red");

	// Fill with gradient
	ctx.fillStyle = gradient;
	ctx.fillText(AnimationLoop.getFrameRate(), 10, 10);
}

AnimationLoop.register('canvasDrawer', draw);
AnimationLoop.start();