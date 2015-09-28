var mongoose = require('mongoose');
exports.BookSchema = new mongoose.Schema({
  ip: Number,
  name: String,
  likeNum: Number,
  commentNum: Number,
  isFree: Boolean
});

