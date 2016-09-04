const request = require('request')
var exports = module.exports

exports.HttpRequest = function(options, callback) {
	var url = options.url
	var params = options.params || {}
	var method = options.method || "POST"

	if (url == null) {
		return callback(400, "Require url params")
	}

	request({
		url: url,
		qs: method == "GET" ? params : null,
		useQuerystring: true,
		method: method,
		strictSSL: false,
		formData: method == "POST" ? params : null
	}, function(err, response, body) {
		if (err) {
			callback(err, {
				res: response,
				body: body
			});
			return;
		}

		//Dispatcher
		setTimeout(function() {
			callback(null, body);
		}, 0)

	});
}

exports.HttpRequestPromise = function(options) {
	var url = options.url
	var params = options.params || {}
	var method = options.method || "POST"

	if (url == null) {
		return callback(400, "Require url params")
	}

	return new Promise((resolve, reject) => {
		request({
			url: url,
			qs: method == "GET" ? params : null,
			useQuerystring: true,
			method: method,
			strictSSL: false,
			formData: method == "POST" ? params : null
		}, function(err, response, body) {
			if (err) {
				reject({
					err: err,
					res: response,
					body: body
				});
				return;
			}

			//Dispatcher
			setTimeout(function() {
				resolve(body);
			}, 0)
		});
	})
}