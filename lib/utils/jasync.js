const async = require('async');
var exports = module.exports

/*
Warpper for async series utils 
Ref: https://github.com/caolan/async#seriestasks-callback
Example:
	Utils.RunSyncSeries({
		step1 : function (callback) {
			callback(null, 1);
		},
		step2 : function (callback) {
			callback(null, 2);	
		}
	}, function onDone (err, results) {
		console.log(err, results);  //{step1 : 1, step2 : 2}
	})
*/
exports.RunSyncSeries = function(funLists, doneCallback) {
	async.series(funLists, doneCallback);
}

/*
Warpper for async waterfall utils 
Ref: https://github.com/caolan/async#seriestasks-callback
Example:
	Utils.RunSyncWaterfall([
		function(callback) {
			callback(null, 'one', 'two');
		},
		function(arg1, arg2, callback) {
			// arg1 now equals 'one' and arg2 now equals 'two'
			callback(null, 'three');
		},
		function(arg1, callback) {
			// arg1 now equals 'three'
			callback(null, 'done');
		}
	], function(err, result) {
		// result now equals 'done'    
	})
*/
exports.RunSyncWaterfall = function(funLists, doneCallback) {
	async.waterfall(funLists, doneCallback);
}

/*
Warpper for parallel tasks
Ref: https://github.com/caolan/async#paralleltasks-callback
Example:
	async.parallel({
	    one: function(callback){
	        setTimeout(function(){
	            callback(null, 1);
	        }, 200);
	    },
	    two: function(callback){
	        setTimeout(function(){
	            callback(null, 2);
	        }, 100);
	    }
	},
	function(err, results) {
	    // results is now equals to: {one: 1, two: 2}
	});

Example:
	var template = function(value, callback) {
		setTimeout(function() {
			callback(null, value);
		}, 200)
	};

	async.parallel({
			one: template.bind(null, 99),
			two: template.bind(null, 100)
		},
		function(err, results) {
			console.log(results)
		});

*/
exports.RunParallel = function(funLists, doneCallback) {
	async.parallel(funLists, doneCallback);
}


/*
Warpper for parallel tasks
Ref: https://github.com/caolan/async#queueworker-concurrency
Example:
	// create a queue object with concurrency 2

	var q = async.queue(function (task, callback) {
	    console.log('hello ' + task.name);
	    callback();
	}, 2);


	// assign a callback
	q.drain = function() {
	    console.log('all items have been processed');
	}

	// add some items to the queue

	q.push({name: 'foo'}, function (err) {
	    console.log('finished processing foo');
	});
*/
exports.CreateQueue = function(jobCallback, concurrencyCount) {
	concurrencyCount = concurrencyCount || 1
	var q = async.queue(jobCallback, concurrencyCount);
	return q
}