var _ = require('lodash'),
	Joi = require('joi'),
	Alert = require('../canvas/alert'),
	canvas = require('../canvas'),
	alerts = {},
	alertCount = 0;

/**
 * Nibiru proxy handler.
 * @param server
 */
var register = function (server) {
	/**
	 * Serve the POST route to handle the configuration
	 */
	server.route({
		method: 'POST',
		path: '/alerts',
		config: {
			handler: newAlertHandler,
			payload: {
				parse: true
			},
			validate: {
				payload: {
					status: Joi.string().valid('info', 'warn', 'danger', 'success').required(),
					system: Joi.string().min(3).max(25).required(),
					message: Joi.string().required()
				}
			}
		}
	});
};

function newAlertHandler (request, reply) {
	alertCount++;

	var alert = new Alert(canvas, request.payload);

	alerts[alertCount] = alert;

	// Disable other alerts
	_.forOwn(alerts, function (alert) {
		alert.disable();
	});

	alert.enable();

	reply().code(204);
}

/**
 * Export the module
 */
module.exports = register;

