var Class = require('../class').Class,
	AnimationLoop = require('../animation-loop'),
	instanceId = 0;

var BaseModel = Class.extend({
	ctx: null,
	canvas: null,
	_instanceId: null,

	init: function init (canvas) {
		this.canvas = canvas;

		this.ctx = this.canvas.getContext('2d');
		this._loadImages();
		this._instanceId = instanceId++;
	},

	_loadImages: function _loadImages () {
		/* Override this with image loading */
	},

	draw: function draw () {
		/* Override this with the canvas logic */
	},

	disable: function () {
		AnimationLoop.unregister(this._instanceId);
	},

	enable: function () {
		AnimationLoop.register(this._instanceId, this.draw, this);
	}
});

module.exports = BaseModel;