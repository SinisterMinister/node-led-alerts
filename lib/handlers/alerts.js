var _ = require('lodash'),
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
					status: Joi.string.valid('info', 'warn', 'danger', 'success').required(),
					system: Joi.string.min(3).max(25).required(),
					message: Joi.string.required()
				}
			}
		}
	});
};

function newAlertHandler (request, reply) {
	alertCount++;

	alerts[alertCount] = request
}

/**
 * Function that maps the request to the correct path in the Nibiru API. Also adds the team bearer token.
 * @param request
 * @param callback
 */
function mapUri (request, callback) {
	var path = 'https://nibiru-prod.prsn.us/api/'+(request.params.path || ''),
		headers = _.extend({}, request.headers);

	// Remove the host from the headers
	delete headers.host;

	callback(null, path, headers);
}

/**
 * Map the functions to an API object that we can use to run unit tests against
 */
register.api = {
	mapUri: mapUri
};

/**
 * Export the module
 */
module.exports = register;

