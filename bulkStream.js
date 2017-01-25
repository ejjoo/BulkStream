var stream = require('stream'),
	events = require('events'),
	util = require('util');

function BulkStream(chunkSize) {
	stream.Writable.call(this, {objectMode: true});

	this.bulk = [];
	this.chunkSize = chunkSize || 1000;
	this.emitter = new events.EventEmitter();

	this.on('finish', function() {
		this._close();
	}.bind(this));
}

util.inherits(BulkStream, stream.Writable);
BulkStream.prototype._write = function (chunk, encoding, callback) {
	this.push(chunk);
	callback();
}

BulkStream.prototype._close = function(cb) {
	clearTimeout(this.timer);
	this._emit();
	this.emitter.emit('close');	
}

BulkStream.prototype._emit = function() {
	if (this.bulk.length == 0) {
		return;
	}

	this.emitter.emit('data', this.bulk.slice());	
	this.bulk = [];
}

BulkStream.prototype.on = function(event, cb) {
	if (event != 'data' && event != 'close') {
		stream.Writable.prototype.on.call(this, event, cb);
		return;
	}

	this.emitter.on(event, cb);
	return this;
}

BulkStream.prototype.push = function(data, cb) {
	this.bulk.push(data);

	if (this.bulk.length >= this.chunkSize) {
		this._emit();
		return;
	}
}

module.exports = {
	create: create = function(chunkSize) {
		return new BulkStream(chunkSize);
	}
}