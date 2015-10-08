var mongoose = require('mongoose');
var BookSchema = new mongoose.Schema({
  id: Number,
  name: String,
  likeNum: Number,
  commentNum: Number,
  isFree: Boolean
});

module.exports = mongoose.model('Book', BookSchema);

