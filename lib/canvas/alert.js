var Canvas = require('openvg-canvas'),
	BaseCanvasHandler = require('./base'),
	fs = require('fs');

// Load the icons


// Export the module
module.exports = BaseCanvasHandler.extend({
	_loadImages: function () {
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

