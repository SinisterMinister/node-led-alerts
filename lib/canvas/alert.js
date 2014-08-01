var Canvas = require('openvg-canvas'),
	BaseCanvasHandler = require('./base'),
	fs = require('fs');

// Load the icons


var Alert = BaseCanvasHandler.extend({
	ctx: null,
	_instanceId: null,

	init: function init (context) {

		console.info('loading base class');
		this.ctx = context;
		this._loadImages();
		this._instanceId = instanceId++;

		AnimationLoop.register(this._instanceId, this.draw, this);
	},

	_loadImages: function () {
		console.info('loading images');
		var warnIcon = new Canvas.Image();
		warnIcon.src = fs.readFileSync(__dirname+'/images/warning_ffff00_20.png');

		this.warnIcon = warnIcon;
	},

	draw: function draw () {
		var ctx = this.ctx;

		// Clear the canvas
		ctx.clearRect(0, 0, w, h);

		// Set the background to black
		ctx.fillStyle = 'black';
		ctx.fillRect(0, 0, w, h);

		// Draw the icon
		ctx.drawImage(this.warnIcon, 2, 6);

		// Set the font to 6px
		ctx.font = "6px small-font";

		// Set the text fill to the gradient and write the text
		ctx.fillStyle = 'white';
		ctx.fillText("Course Structure API", 24, 7);

		var text = "10.199.252.102 is down!";

		ctx.fillText(text, 24, 15);
		ctx.fillText(text, 24, 23);
		ctx.fillText(text, 24, 31);
	}
});

module.exports = Alert;