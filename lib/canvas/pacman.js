var Canvas = require('openvg-canvas'),
	BaseCanvasHandler = require('./base'),
	fs = require('fs'),
	AnimationLoop = require('../animation-loop');

	var open = true;
	var switchFrame = 0;

// Load the icons


// Export the module
module.exports = BaseCanvasHandler.extend({
	_loadImages: function () {
		var pacmanOpen = new Canvas.Image();
		pacmanOpen.src = fs.readFileSync(__dirname+'/../../images/pacmanopen.png');

		this.pacmanOpen = pacmanOpen;

		var pacmanClose = new Canvas.Image();
		pacmanClose.src = fs.readFileSync(__dirname+'/../../images/pacmanclose.png');

		this.pacmanClose = pacmanClose;


		var blinky = new Canvas.Image();
		blinky.src = fs.readFileSync(__dirname+'/../../images/blinky.png');

		this.blinky = blinky;
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
		// Alternate open and close pacman
		if(AnimationLoop.getFrame() == (switchFrame + 3)) {
			switchFrame = AnimationLoop.getFrame();
			open = (open) ? false : true;
		}
		if(open) {
			ctx.drawImage(this.pacmanOpen, 2, 2);
		} else {
			ctx.drawImage(this.pacmanClose, 2, 2);
		}

		ctx.drawImage(this.blinky, 90, 2);
		
		// Set the font to 6px
		ctx.font = "6px small-font";

		// Set the text fill to the gradient and write the text
		ctx.fillStyle = 'white';
		ctx.fillText("Happy", 52, 12);
		ctx.fillText("Hacking!", 48, 20);

	}
});