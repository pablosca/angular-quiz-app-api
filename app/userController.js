var User = require('./userModel');

exports.addUser = function (req, res) {
	var user = new User({
		username: req.body.username,
		password: req.body.password
	});

	user.save(function (err) {
		if (err) {
			return res.send(err);
		}
		res.json({message: 'User successfully created'});
	});
};

exports.login = function (req, res) {
	res.json({isAuthenticated: req.isAuthenticated()});
};