// modules
var config = require('./config'),
	express = require('express'),
	bodyParser = require('body-parser'),
	router = require('./router'),
	mongoose = require('mongoose'),
	passport = require('passport');

var app = express();

mongoose.connect(config.mongo.url, function (error) {
	if (error) {
		console.log(error);
	}
});

// body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Authorization");
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(passport.initialize());

// router handles all the routes of the api
router(app);

app.listen(config.express.port, function (error) {
	if (error) {
		console.log('Unable to listen for connections', error);
	} else {
		console.log('On port: ' + config.express.port);
	}
});