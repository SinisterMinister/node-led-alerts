var Canvas = require('openvg-canvas'),
	AnimationLoop = require('./lib/animation-loop'),
    canvas = new Canvas(128, 32),
    ctx = canvas.getContext('2d'),
    w = canvas.width, h = canvas.height,
	frame = 0,
	frameRate = "NA";



function draw () {
	if (frame++ % 10 === 0) {
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
	ctx.fillText("FPS: "+frameRate, 10, 20);
	ctx.fillText("Frame: "+frame.toString(), 10, 40);

	var data = ctx.getImageData(0, 0, w, h).data;

	var pdata = [];

	for (var i = 0; i < 32; i++) {
		pdata.push(data[i]);
	}

	console.info.call(null, pdata);
}

AnimationLoop.register('canvasDrawer', draw);
AnimationLoop.start();