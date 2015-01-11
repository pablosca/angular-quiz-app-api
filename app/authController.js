var passport = require('passport'),
	BasicStrategy = require('passport-http').BasicStrategy,
	User = require('./userModel');

passport.use(new BasicStrategy(
	function (username, password, callback) {
		User.findOne({ username: username }, function (err, user) {
			if (err) {
				return callback(err);
			}

			// No user found with that username
			if (!user) {
				return callback(null, false);
			}

			// Make sure the password is correct
			user.verifyPassword(password, function (err, isMatch) {
				if (err) {
					return callback(err);
				}

				// Password did not match
				if (!isMatch) {
					return callback(null, false);
				}

		        // Success
		        return callback(null, user);
			});
		});
	}
));

// The option of session being set to false
// tells passport to not store session variables between calls to our API.
// This forces the user to submit the username and password on each call.
exports.isAuthenticated = passport.authenticate('basic', {session: false});