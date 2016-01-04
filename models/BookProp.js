var mongoose = require('mongoose');
var BookPropSchema = new mongoose.Schema({
	isbn: String,
	name: String,
	category: String,
	publisher: String,
	author: String,
	pageCount: Number,
	price: Number,
	count: Number,
	desc: String,
	image: String,
	likes: [String],    // Likes
	rates: [{intrID: String, value: Number}],   // Rates
	comments: [{intrID: String, content: String, time: Date}], // Comments
});

module.exports = mongoose.model('BookProp', BookPropSchema);

