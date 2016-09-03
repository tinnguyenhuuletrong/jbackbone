const uid = require('node-uuid')

module.exports.GenerateUID = function() {
	return uid.v4()
}

module.exports.ParseJsonString = function(input) {
	try {
		if (input == null)
			return null

		return JSON.parse(input)
	} catch (ex) {
		return null
	}
}