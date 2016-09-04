var JUtils = require('../../lib/index.js').Utils

// * RunSyncSeries
//	Ref: https://github.com/caolan/async#seriestasks-callback
//
JUtils.RunSyncSeries({
	step1: function(callback) {
		console.log("[JUtils.RunSyncSeries] step 1 done")
		callback(null, 1);
	},
	step2: function(callback) {
		console.log("[JUtils.RunSyncSeries] step 2 done")
		callback(null, 2);
	}
}, function onDone(err, results) {
	console.log("[JUtils.RunSyncSeries] done", err, results); //{step1 : 1, step2 : 2}
})

// * RunParallel
//	Ref: https://github.com/caolan/async#paralleltasks-callback
//
var tasks = {
	one: callback => {
		callback(null, 1)
	},
	two: callback => {
		setTimeout(function() {
			callback(null, 2)
		}, 1000);
	}
}

JUtils.RunParallel(tasks, (err, results) => {
	console.log("[JUtils.RunParallel] done", err, results)
})

// * Queue
//	Ref: https://github.com/caolan/async#queueworker-concurrency
//

// create queue with concurence 1 (task processing one by one)
var queue = JUtils.CreateQueue((task, onDoneCallback) => {

	//Simulate processing 1 sec
	setTimeout(function() {
		console.log("[JUtils.Queue] process", task.name);
		onDoneCallback(null, 1);
	}, 2000);

}, 1)


//push task
queue.push({
	name: 'foo'
}, (err, res) => {
	console.log("[JUtils.Queue] done with err,res: ", err, res);
});
queue.push({
	name: 'bar'
}, (err, res) => {
	console.log("[JUtils.Queue] done with err,res: ", err, res);
});