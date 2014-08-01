var Hapi = require('hapi'),
	Joi = require('joi'),
	argv = require('yargs').argv,
	alertsHandler = require('./handlers/alerts');

var port = argv.port || 8080,
	server = new Hapi.Server('0.0.0.0', port);

/**
 * Attach the alert handler
 */
alertsHandler(server);

/**
 * Start the server
 */
server.start();

module.exports = server;

