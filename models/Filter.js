var Book = require('../models/Book.js');

exports.authorize = function(req, res, next) {
  if (!req.session.user_id) {
    res.status(401).send('Unauthorized');
  } else {
    next();
  }
};

exports.cancelExpiredBook = function(_id) {
  console.log(_id);
  Book.findByIdAndUpdate({
    _id: _id
  }, {
    status: 0,
    $unset: {
      intrID: '',
      applyTime: null,
      borrowTime: null,
      returnTime: null
    }
  });
};

