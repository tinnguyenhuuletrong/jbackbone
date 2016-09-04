const uid = require('node-uuid')
var exports = module.exports

//Auto import sub modules
const subModules = [
	"./utils/jasync.js",
	"./utils/jhttp_request.js"
]
for (var i = subModules.length - 1; i >= 0; i--) {
	try {
		let m = require(subModules[i])

		for (let func in m) {
			if (exports[func] != null)
				throw new Error("[JUtils] conflict function name: ", func)
			exports[func] = m[func]
		}

	} catch (ex) {
		console.error(ex)
		continue
	}
}

//Common methods
exports.GenerateUID = function() {
	return uid.v4()
}

exports.ParseJsonString = function(input) {
	try {
		if (input == null)
			return null

		return JSON.parse(input)
	} catch (ex) {
		return null
	}
}