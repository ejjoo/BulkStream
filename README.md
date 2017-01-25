# bulkStream
BulkStream is an writable stream that receives data from the readable stream and creates it as a array of data. It is useful to transfer large amounts of data, especially to send data to a database that supports bulk insert.

# Usage
It is very simple to use. 
```js
var bulkStream = require('./bulkStream').create(100);

var fs = require('fs');
var fws = fs.createReadStream('large-data.csv').pipe(bulkStream);

bulkStream
	.on('data', function(data) {
		console.log(data.length);
	})
	.on('close', function() {
		console.log('done');
		fws.close();
	});

BulkStream has only two event. 'data' is called when array of data has filled by the size as you want and 'close' is when readable-stream has closed.

Unfortunately, it's not possible to receive data through stream. This is because Readable Stream is only acceptable string and byteBuffer only.

You can use writable stream's method and events, like a cork method or finish event.
