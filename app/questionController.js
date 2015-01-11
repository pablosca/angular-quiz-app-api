var _ = require('underscore'),
	Question = require('./questionModel');

module.exports = {

	/**
	 * Get all the questions
	 * @req  {[http request]}
	 * @res  {[http response]}
	 */
	getQuestions: function (req, res) {
		Question.find(function (error, questions) {
			if (error) {
				return res.send(error);
			}
			res.json(questions);
		});
	},

	/**
	 * Add a question to the collection
	 * the data is on the body of the request (POST)
	 * @req  {[http request]}
	 * @res  {[http response]}
	 */
	addQuestion: function (req, res) {
		var question = new Question();
		// question.content = req.body.content;
		_.extend(question, req.body);

		question.save(function (err) {
			if (err) {
				res.statusCode = 400;
				return res.send(err);
			}
			res.json({message: "Question successfully created."});
		});
	},

	/**
	 * Gets the data for a single question
	 * Question id is in the params of the request (GET)
	 * @req  {[http request]}
	 * @res  {[http response]}
	 */
	getQuestion: function (req, res) {
		Question.findById(req.params.qid, function (err, question) {
			if (err) {
				return res.send(err);
			}
			res.json(question);
		});
	},

	/**
	 * Updates the data for a single question
	 * Question id is in the params of the request (PUT)
	 * @req  {[http request]}
	 * @res  {[http response]}
	 */
	updateQuestion: function (req, res) {
		Question.findById(req.params.qid, function (error, question) {
			if (error) {
				return res.send(error);
			}
			_.extend(question, req.body);

			question.save(function (error) {
				if (error) {
					res.send(error);
				}

				res.json(question);
			});
		});
	},

	/**
	 * Removes a question
	 * Question id is in the params of the request (DELETE)
	 * @req  {[http request]}
	 * @res  {[http response]}
	 */
	removeQuestion: function (req, res) {
		Question.remove({
			_id: req.params.qid
		}, function (error) {
			if (error) {
				res.send(error);
			}
			res.json({message: 'Question successfully removed.'});
		});
	}
};