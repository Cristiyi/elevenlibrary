var Book = require('../models/Book.js');

function getBooks(res) {
  Book.find(function(err, books) {
    if (err) {
      res.send(err);
    };
    res.json(books);
    console.log(books);
  });
};

module.exports = function(app) {
  app.get('/manage-books', function(req, res) {
    getBooks(res);
  });

  app.delete('/manage-books', function(req, res) {
    Book.remove(function(err, books) {
      if (err) {
        res.send(err);
      } else {
        console.log('Remove All Successfully!');
      };
    });
  });

  app.get('/manage/:bookId', function(req, res) {
    var bookId = req.params.id;
    Book.findById(bookId, function(err, book) {
      if (err) {
        res.send(err);
      };
      res.json(book);
    })
  });

  app.post('/manage-books', function(req, res) {
    var newBook = {
      'name': req.body.name,
      'likeNum': req.body.likeNum,
      'commentNum': req.body.commentNum,
      'isFree': req.body.isFree
    };
    Book.create(newBook, function(err, book) {
      if (err) {
        res.send(err);
      };
      console.log(req.body);
    });
  });

  app.get('/', function(req, res, next) {
    res.render('index');
  });
};
