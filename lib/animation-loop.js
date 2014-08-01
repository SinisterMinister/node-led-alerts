var _ = require('lodash'),
	methods = {},
	api = {},
	run = false,
	frameRate = 0,
	lastFrame = 0,
	frameCount = 0;

api.register = function register (name, method, context) {
	if ( ! _.isFunction(method))
		throw new Error('Expected a function, received '+(typeof method));

	methods[name] = {
		method: method,
		context: context
	};
};

api.unregister = function unregister (name) {
	delete method[name];
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

api.getFrame = function getFrame() {
	return frameCount;
};

function animationLoop () {
	frameCount++;

	// Stop the loop if stopped and reset the framerate stuff
	if ( ! run) {
		frameRate = lastFrame = 0;
		return;
	}

	_.forOwn(methods, function (method) {
		if (typeof method === 'function')
			method.method.call(method.context);
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