var JUtils = require('../../lib/index.js').Utils

JUtils.HttpRequest({
	url: "https://httpbin.org/get",
	method: "GET",
	params: {
		"name": "Tintatoi_get"
	}
}, (err, response) => {
	console.log(response)
})

JUtils.HttpRequestPromise({
	url: "https://httpbin.org/post",
	method: "POST",
	params: {
		"name": "TinTaToi_post"
	}
}).then(response => {
	console.log(response)
})