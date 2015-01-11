var express = require('express'),
	questionController = require('./questionController'),
	userController = require('./userController'),
	authController = require('./authController');


/**
 * Gets a welcome message to the API
 * @req  {[HTTP request]}
 * @res  {[HTTP response]}
 */
function getApiRoot (req, res) {
	res.json({ message: 'Welcome to the Quiz API.' });	
}

/**
 * Logs every request to the console
 * @req  {[HTTP request]}
 * @res  {[HTTP response]}
 * @next  {Function}
 */
function logRequests (req, res, next) {
	console.log('Requested url: ' + req.originalUrl);
	next();
}

module.exports = function (app) {
	var router = express.Router();

	// middleware to log every request
	router.use(logRequests);

	// /api
	router.get('/', getApiRoot);

	router.route('/api/questions')
		.get(questionController.getQuestions)
		.post(authController.isAuthenticated, questionController.addQuestion);

	router.route('/api/questions/:qid')
		.get(questionController.getQuestion)
		.put(authController.isAuthenticated, questionController.updateQuestion)
		.delete(authController.isAuthenticated, questionController.removeQuestion);

	router.route('/api/users')
		.post(userController.addUser);	

	router.route('/login')
		.post(authController.isAuthenticated, userController.login);

	// all routes are prefixed with /api
	app.use(router);
};