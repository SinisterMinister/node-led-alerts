var Canvas = require('openvg-canvas'),
	BaseCanvasHandler = require('./base'),
	fs = require('fs');

// Load the icons
var warnIcon = new Canvas.Image();
warnIcon.src = fs.readFileSync(__dirname+'/../../images/warning_ffff00_20.png');

var dangerIcon = new Canvas.Image();
dangerIcon.src = fs.readFileSync(__dirname+'/../../images/exclamation-circle_ff0000_20.png');

var infoIcon = new Canvas.Image();
infoIcon.src = fs.readFileSync(__dirname+'/../../images/info-circle_0000ff_20.png');

var successIcon = new Canvas.Image();
successIcon.src = fs.readFileSync(__dirname+'/../../images/check-circle_008000_20.png');

// Export the module
module.exports = BaseCanvasHandler.extend({
	status: null,
	system: null,
	message: null,

	warnIcon: warnIcon,
	dangerIcon: dangerIcon,
	infoIcon: infoIcon,
	successIcon: successIcon,

	init: function init (canvas, alert) {
		this._super(canvas);

		this.status = alert.status;
		this.system = alert.system;
		this.message = alert.message;
	},

	draw: function draw () {
		var ctx = this.ctx,
			w = this.canvas.width, h= this.canvas.height;

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
		ctx.fillText(this.system, 24, 7);

		var text = this.message;

		ctx.fillText(text, 24, 15);
	}
});

