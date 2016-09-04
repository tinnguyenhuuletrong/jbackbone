var Module = require('../../lib/index.js')
var JUtils = Module.Utils
var JCache = Module.cache({
	url: "redis://103.53.171.99:63799"
})

JCache.on("connect", () => {
	test()
})

function test() {
	// Set HSet
	JUtils.RedisHSet("test_h", {
		"key1": 1,
		"key2": 2
	}, console.log)

	setTimeout(function() {
		JUtils.RedisHGet("test_h", "key1", console.log)
		JUtils.RedisHGet("test_h", ["key1", "key2", "key3"], console.log)
	}, 10);

	setTimeout(function() {
		JUtils.RedisHDel("test_h", "key1", console.log)
	}, 20);

}