var JBackbone = require('../../lib/index.js')({
	url: "amqp://guest:09031988@103.53.171.99:5672"
})

let count = 1

JBackbone.cacheSocket({
	type: "PUSH",
	topic: "test.worker"
}).then(push => {
	setInterval(function() {
		push.write(JSON.stringify({
			job: count++
		}));
	}, 10);
}).catch(console.error)