var JBackbone = require('../../lib/index.js').create({
	url: "amqp://guest:09031988@103.53.171.99:5672"
})

JBackbone.cacheSocket({
	type: "WORKER",
	opts: {
		prefetch: 10
	},
	topic: "test.worker"
}).then(worker => {
	worker.setEncoding('utf8');
	worker.on('data', (msg) => {
		console.log("job: ", msg)
		setTimeout(function() {
			worker.ack()
		}, 10);
	})

})