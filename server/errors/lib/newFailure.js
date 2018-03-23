const logger = require('../../logs/logger.js');

const newFailure = ({ log, message, type = 'error'}) => {
	const error = (arg) => {
		if (typeof log === 'string') { logger.failure(log); }
		if (typeof log === 'function') { logger.failure(log(arg)); }

		if (typeof message === 'string') { return { error: [message], type }; }
		if (typeof message === 'function') { return { error: [message(arg)], type }; }

		logger.error('NewFailure argument must be an object, containing a key "message" of type "string" or "function" for string interpolation');
		return { error: 'An error occured on the server' };
	};

	return error;
};

module.exports = newFailure;
