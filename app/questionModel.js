var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var QuestionSchema = new Schema({
	content: String,
	answers: [{text: String}],
	score: Number,
	level: Number,
	correctAnswer: Number
});

module.exports = mongoose.model('Question', QuestionSchema);;