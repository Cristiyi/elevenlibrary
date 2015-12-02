var mongoose = require('mongoose');
var HistorySchema = new mongoose.Schema({
	unqId: String,
	isbn: String,
	bname: String,
	delTime: Date,
	borrower : [{intrID: String, name: String }]
});

module.exports = mongoose.model('History', HistorySchema);

