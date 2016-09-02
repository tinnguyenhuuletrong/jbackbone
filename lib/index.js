const Common = require("./_common.js")
const NullFunc = () => {}

function Backbone(options) {
	const connectURL = options.url || process.env.RABBITMQ_URL
	this.RabbitContext = require('rabbit.js').createContext(connectURL);
	this._onReady = false
	this._cacheSock = {}

	this._promiseWrapper = new Promise((resolve, reject) => {
		this.RabbitContext.on('ready', () => {
			this._onReady = true
			console.log("[Backbone] Connected!")
			resolve()
		})

		this.RabbitContext.on('error', (error) => {
			console.error("[Backbone] Error: ", error)
			reject()
			process.exit(0)
		})
	})
}


//	Create System Socket by type 
//		valid type (PUB, PUBLISH, SUB, SUBSCRIBE, PUSH, PULL, REQ, REQUEST, REP, REPLY, TASK, WORKER )
//
Backbone.prototype.createSock = function(type, opts, callback) {
	callback = callback || NullFunc

	//	Waiting for connection
	if (!this._onReady) {
		return this._promiseWrapper.then(() => {
			return this.createSock(type, opts, callback)
		})
	}

	var sock = this.RabbitContext.socket(type, opts)
	callback(null, sock)
	return Promise.resolve(sock)
}

//	Cache Socket by Type:connection
//	option:
//			+ type: Socket type
//			+ opts: Socket create optional
//			+ topic: topic binding to
//
Backbone.prototype.cacheSocket = function(option, callback) {
	callback = callback || NullFunc

	if (option.type == null || option.topic == null) {
		callback(400, "Require type and topic")
		return Promise.reject(new Error("Require type and topic"))
	}

	//	Waiting for connection
	if (!this._onReady) {
		return this._promiseWrapper.then(() => {
			return this.cacheSocket(option, callback)
		})
	}

	//	Cache Query
	let udidKey = option.type + ":" + option.topic
	if (this._cacheSock[udidKey] != null) {
		let sock = this._cacheSock[udidKey]
		callback(null, sock)
		return Promise.resolve(sock)
	}

	//	Create and Cache
	return new Promise((resolve, reject) => {
		this.createSock(option.type, option.opts).then(sock => {
			sock.connect(option.topic, () => {

				this._cacheSock[udidKey] = sock

				callback(null, sock)
				resolve(sock)
			})
		})
	})
}

var instance = null
module.exports = function(opts) {
	if (instance != null)
		return instance

	instance = new Backbone(opts)
	return instance
}