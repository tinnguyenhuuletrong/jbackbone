const uid = require('node-uuid')

module.exports.GenerateUID = function () {
	return uid.v4()
}