var Module = require('../../lib/index.js')
var JUtils = Module.Utils
var JCache = Module.cache({
	url: "redis://103.53.171.99:63799"
})

JCache.on("connect", () => {
	test()
})

function test() {
	// Set key no TTL
	JUtils.RedisSet("test", "1", console.log)

	// Set key no TTL
	JUtils.RedisSet("test_del", "2", console.log)

	// Set key with TTL
	JUtils.RedisSet("test:ttl_10s", "10", console.log, {
		ttl: 10
	})

	setTimeout(function() {

		//Delete
		JUtils.RedisDelete("test_del", console.log)
		
	}, 500);

	setTimeout(function() {
		// Get Key
		JUtils.RedisGet("test", console.log)

		// Query Keys
		JUtils.RedisKeys("*", console.log)

		// Query MGet
		JUtils.RedisMGet(["test", "test:ttl_10s", "notexit"], console.log)

	}, 1000);
}