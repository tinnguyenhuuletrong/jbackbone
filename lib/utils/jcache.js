var exports = module.exports

function _ensureConnect(callback) {
	if (global.Redis == null) {
		callback(500, null)
		return false
	}
	return true
}

function _ensureString(data) {
	if (typeof data === 'string' || data instanceof String) {} else {
		data = JSON.stringify(data)
	}
	return data
}

//-------------------------------------------------------------------------------//
//	Basic Function
//-------------------------------------------------------------------------------//
exports.RedisKeys = function(keyPattern, callback) {
	if (!_ensureConnect(callback))
		return

	global.Redis.keys(keyPattern, callback)
}

exports.RedisGet = function(key, callback) {
	if (!_ensureConnect(callback))
		return

	global.Redis.get(key, callback)
}

exports.RedisMGet = function(keys, callback) {
	if (!_ensureConnect(callback))
		return

	if (!(keys instanceof Array))
		return callback(400, "keys must be array")

	global.Redis.mget(keys, callback)
}

exports.RedisSet = function(key, value, callback, options) {
	if (!_ensureConnect(callback))
		return

	options = options || {}
	let ttl = options.ttl || -1

	value = _ensureString(value)

	if (ttl != -1) {
		global.Redis.setex(key, value, ttl, callback)
	} else {
		global.Redis.set(key, value, callback)
	}
}

exports.RedisDelete = function(key, callback) {
	if (!_ensureConnect(callback))
		return

	global.Redis.del(key, callback)
}

//-------------------------------------------------------------------------------//
//	Hash Function
//-------------------------------------------------------------------------------//
exports.RedisHSet = function(key, keyVal, callback) {
	if (!_ensureConnect(callback))
		return

	let args = []
	args.push(key)
	for (var key in keyVal) {
		args.push(key)
		args.push(_ensureString(keyVal[key]))
	}

	global.Redis.hmset(args, callback)
}

exports.RedisHGet = function(key, subKeys, callback) {
	if (!_ensureConnect(callback))
		return

	let args = []
	args.push(key)
	if (!(subKeys instanceof Array)) {
		args.push(subKeys)
	} else {
		args = args.concat(subKeys)
	}

	global.Redis.hmget(args, callback)
}

exports.RedisHDel = function(key, subkey, callback) {
	if (!_ensureConnect(callback))
		return

	if (subkey instanceof Array)
		return callback(400, "subkey must be string. Using Multi commands to send batch commands")

	global.Redis.hdel([key, subkey], callback)
}

//-------------------------------------------------------------------------------//
//	Set Function
//-------------------------------------------------------------------------------//