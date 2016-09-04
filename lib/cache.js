var EventEmitter = require('events').EventEmitter;
var util = require('util');
var redis = require("redis")

function Cache(options) {
	var self = this

	this.client = redis.createClient({
		url: options.url
	});

	this.client.on("error", function(err) {
		if (global.Redis != null) {
			global.Redis = null
			self.emit("disconnect")
		}
		console.error("[Cache] Error: ", err)
	});

	this.client.on("connect", function() {
		console.log("[Cache] Connected!")
		global.Redis = self.client
		self.emit("connect")
	})
}
util.inherits(Cache, EventEmitter);

module.exports = Cache