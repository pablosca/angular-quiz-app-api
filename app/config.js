var config = module.exports,
	PRODUCTION = process.env.NODE_ENV === "production";

config.express = {
	port: process.env.PORT || 8080
};

config.mongo = {
	url: 'MONGODB_URL_GOES_HERE'
};