# bulkStream
BulkStream is an writable stream to generate bulk array date from readable stream. 
Designed for supporting the bulk insert to database using data stream.

# Usage
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
```

* BulkStream has two type of events. 
1. data
- This will be emited when bulk array has filled with configured size
2. close 
- readable-stream has closed.
