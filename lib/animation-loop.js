var _ = require('lodash'),
	methods = {},
	api = {},
	run = false,
	frameRate = 0,
	lastFrame = 0;

api.register = function register (name, method) {
	if ( ! _.isFunction(method))
		throw new Error('Expected a function, received '+(typeof method));

	methods[name] = method;
};

api.start = function start () {
	run = true;
	animationLoop();
};

api.stop = function stop () {
	run = false;
};

api.isRunning = function isRunning () {
	return run;
};

api.getFrameRate = function getFrameRate () {
	return frameRate;
};

function animationLoop () {
	// Stop the loop if stopped and reset the framerate stuff
	if ( ! run) {
		frameRate = lastFrame = 0;
		return;
	}

	_.forOwn(methods, function (method) {
		method.call();
	});

	// Calculate Frame Rate
	if (lastFrame !== 0) {
		var now = Date.now(),
			dur = now - lastFrame;

		frameRate = Math.floor(1000 / dur);
	}

	lastFrame = Date.now();

	requestAnimationFrame(animationLoop);
}

module.exports = api;