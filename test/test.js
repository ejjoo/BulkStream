var BulkStream = require('../bulkStream');

const assert = require('assert');

var chunkSize = 10
	, inputDataSize = 100;

var bulkStream = BulkStream.create(chunkSize);
bulkStream
	.on('data', function(data) {
		assert(data != null);
		assert(Array.isArray(data));
		assert(data.length == chunkSize || data.length == inputDataSize % chunkSize);
	})
	.on('close', function() {
		console.log('done')
	})

for (var i=0; i<inputDataSize; i++) {
	bulkStream.write(i);
}