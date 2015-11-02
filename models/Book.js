var mongoose = require('mongoose');
var BookSchema = new mongoose.Schema({
	unqId: String,
	isbn: String,
	status: Number,//0-free,1-reserved,2-borrowed
	applyTime: Date,
	lendTime: Date,
	name: String,
	intrID: String,
	isDeleted: Number //0-exist,1-deleted
});

module.exports = mongoose.model('Book', BookSchema);

