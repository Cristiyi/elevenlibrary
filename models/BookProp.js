var mongoose = require('mongoose');
var BookPropSchema = new mongoose.Schema({
	isbn: String,
	name: String,
	desc: String,
	publisher: String,
	author: String,
	pageCount: Number,
	price: Number,
	count: Number,
	image: String
});

module.exports = mongoose.model('BookProp', BookPropSchema);

