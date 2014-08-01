var Canvas = require('openvg-canvas'),
	Class = require('../class'),
	AnimationLoop = require('../animation-loop'),
	instanceId = 0;

module.exports = Class.extend({
	ctx: null,
	_instanceId: null,

	init: function init (context) {
		this.ctx = context;
		this._loadImages();
		this._instanceId = instanceId++;

		AnimationLoop.register(this._instanceId, this.draw, this);
	},

	_loadImages: function _loadImages () {
		/* Override this with image loading */
		console.info('loading base class');
	},

	draw: function draw () {
		/* Override this with the canvas logic */
	},

	destroy: function () {
		AnimationLoop.unregister(this.this._instanceId);
	}
});