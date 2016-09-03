var JBackbone = require('../../lib/index.js').create({
	url: "amqp://guest:09031988@103.53.171.99:5672"
})

JBackbone.createSock("PUB").then(pub => {
	pub.connect('test.notifications', function() {
		pub.write(JSON.stringify({
			welcome: 'rabbit.js'
		}));
	});
})