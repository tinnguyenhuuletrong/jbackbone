var JBackbone = require('../../lib/index.js')({
	url: "amqp://guest:09031988@103.53.171.99:5672"
})

JBackbone.createSock("SUB").then(sub => {
	sub.setEncoding('utf8');
	sub.connect('test.notifications', function() {
		sub.on("data", (msg) => {
			console.log(msg)
		});
	});
})