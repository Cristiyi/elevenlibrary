var mongoose = require('mongoose');
var BookPropSchema = new mongoose.Schema({
	isbn: String,
	name: String,
	category: String,
	publisher: String,
	author: String,
	pageCount: Number,
	price: Number,
	desc: String,
	image: String,
	count: Number
});

module.exports = mongoose.model('BookProp', BookPropSchema);

