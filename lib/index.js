const Backbone = require("./backbone.js")
const Cache = require("./cache.js")

var instance = null
module.exports.create = function(opts) {
	if (instance != null)
		return instance

	instance = new Backbone(opts)
	return instance
}

var cacheInstance = null
module.exports.cache = function(opts) {
	if (cacheInstance != null)
		return cacheInstance

	cacheInstance = new Cache(opts)
	return cacheInstance
}

module.exports.Utils = require("./utils.js")