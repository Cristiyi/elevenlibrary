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
<<<<<<< HEAD
	count: Number
=======
	likes: [String],    // Likes
	rates: [{intrID: String, value: Number}],   // Rates
	comments: [{intrID: String, content: String, time: Date}], // Comments
>>>>>>> 3ae7d3a43d2bdd5fbb321e85b9bcaa9ff2e52ab1
});

module.exports = mongoose.model('BookProp', BookPropSchema);

