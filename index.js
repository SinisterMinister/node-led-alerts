var Canvas = require('openvg-canvas'),
	AnimationLoop = require('./lib/animation-loop'),
    canvas = new Canvas(300, 300),
    ctx = canvas.getContext('2d'),
    w = canvas.width, h = canvas.height;



function draw () {
	ctx.clearRect(0, 0, w, h);

	ctx.font = "16px sans-serif";

	var gradient=ctx.createLinearGradient(0,0,w,0);
	gradient.addColorStop("0","magenta");
	gradient.addColorStop("0.5","blue");
	gradient.addColorStop("1.0","red");

	// Fill with gradient
	ctx.fillStyle = gradient;
	ctx.fillText("Test", 10, 10);
}

AnimationLoop.register('canvasDrawer', draw);
AnimationLoop.start();