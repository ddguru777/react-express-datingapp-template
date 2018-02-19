const Users = require('../../models/user');
const logger = require('../../logs/logger');
const myError = require('../../errors');

const error = {
	emailNotUnique: myError.newFailure({
		log: 'Email already registered',
		message: 'This Email is already registered.',
	}),

	loginNotUnique: myError.newFailure({
		log: 'Login already registered',
		message: 'This Login is already registered.',
	}),

	missingCaptcha: myError.newFailure({
		log: 'User didn\'t validate reCaptcha',
		message: 'You must validate reCaptcha',
	}),
};

const registrationValidation = async (user) => {
	let errors = [];

	errors.push(Users.validatePassword(user));
	errors.push(Users.validateEmail(user));
	
	if (!user.captcha)
		errors.push(error.missingCaptcha());

	const userWithThisEmail = await Users.find({ email: user.email });

	if (userWithThisEmail.user) {
		errors.push(error.emailNotUnique());
	}
	//	if (userWithThisLogin.user) {
	//		errors.push(error.loginNotUnique());
	//	}

	myError.cleanBuffer(errors);
	errors = myError.mergeBuffer(errors);

	return errors;
};

const registration = async (request) => {
	const user = { ...request };

	logger.info('validating user data...');
	const response = await registrationValidation(user);
	if (response.error.length) { return response; }

	logger.info('hashing password...');
	user.password = await Users.hashPassword(user);

	logger.info('Insert in database new user...');
	return Users.create(user);
};

module.exports = registration;
