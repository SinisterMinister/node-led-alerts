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
		switch (this.status) {
			case 'warn':
				ctx.drawImage(this.warnIcon, 2, 6);
				break;
			case 'danger':
				ctx.drawImage(this.dangerIcon, 2, 6);
				break;
			case 'info':
				ctx.drawImage(this.infoIcon, 2, 6);
				break;
			case 'success':
				ctx.drawImage(this.successIcon, 2, 6);
				break;
		}

		// Set the font to 6px
		ctx.font = "6px small-font";

		// Set the text fill to the gradient and write the text
		ctx.fillStyle = 'white';
		ctx.fillText(this.system, 24, 7);

		wrapText(ctx, this.message, 24, 15, 100, 8);
	}
});

function wrapText(context, text, x, y, maxWidth, lineHeight) {
	var words = text.split(' ');
	var line = '';

	for(var n = 0; n < words.length; n++) {
		var testLine = line + words[n] + ' ';
		var metrics = context.measureText(testLine);
		var testWidth = metrics.width;
		if (testWidth > maxWidth && n > 0) {
			context.fillText(line, x, y);
			line = words[n] + ' ';
			y += lineHeight;
		}
		else {
			line = testLine;
		}
	}
	context.fillText(line, x, y);
}

