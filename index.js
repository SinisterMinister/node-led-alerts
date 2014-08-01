var AnimationLoop = require('./lib/animation-loop'),
	Pacman = require('./lib/canvas/pacman'),
    canvas = require('./lib/canvas'),
	server = require('./lib/server');

// Load the pacman loader
var pacman = new Pacman(canvas);

pacman.enable();

// Start the animation loop
AnimationLoop.start();
