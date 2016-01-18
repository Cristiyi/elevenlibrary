var Book = require('../models/Book.js');
var BookProp = require('../models/BookProp.js');

module.exports = function(app) {
  app.get('/books', function(req, res) {
    Book.find(function(err, books) {
      if (err) {
        console.log("[Query books] DB error !");
        res.send(err);
      } else {
        BookProp.find(function(err, booksprop) {
          if (err) {
            console.log("[Query BookProp] DB error !");
            res.send(err);
          } else {
            var newBooks = [];
            for (var i = 0; i < books.length; i++) {
              for (var j = 0; j < booksprop.length; j++) {
                if (books[i].isbn == booksprop[j].isbn) {
                  var book = {};
                  book.unqId = books[i].unqId;
                  book.isbn = books[i].isbn;
                  book.status = books[i].status;
                  book.applyTime = books[i].applyTime;
                  book.borrowTime = books[i].borrowTime;
                  book.returnTime = books[i].returnTime;
                  book.intrID = books[i].intrID;
                  book.borrower = books[i].borrower;
                  book.name = booksprop[j].name;
                  book.category = booksprop[j].category;
                  book.desc = booksprop[j].desc;
                  book.publisher = booksprop[j].publisher;
                  book.author = booksprop[j].author;
                  book.pageCount = booksprop[j].pageCount;
                  book.price = booksprop[j].price;
                  book.count = booksprop[j].count;
                  book.image = booksprop[j].image;
                  book.likes = booksprop[j].likes;
                  book.rates = booksprop[j].rates;
                  book.comments = booksprop[j].comments;
                  newBooks.push(book);
                  break;
                };
              };
            };
            res.send(newBooks);
          };
        });
      };
    });
  });

  // Likes, Rates and Comments
  app.put('/book/:isbn/like', function(req, res) {
    var isbn = req.params.isbn;
    var intrID = req.body.intrID;
    var ifYou = req.body.ifYou;
    if (ifYou) {
      BookProp.findOneAndUpdate({
        isbn: isbn
      }, {
        $push: {
          likes: intrID
        }
      }, function(err, book) {
        BookProp.findById({
          _id: book._id
        }, function(err, book_new) {
          res.send(book_new.likes);
        });
      });
    } else {
      BookProp.findOneAndUpdate({
        isbn: isbn
      }, {
        $pull: {
          likes: intrID
        }
      }, function(err, book) {
        BookProp.findById({
          _id: book._id
        }, function(err, book_new) {
          res.send(book_new.likes);
        });
      });
    };
  });

  app.put('/book/:isbn/rate', function(req, res) {
    var isbn = req.params.isbn;
    var intrID = req.body.intrID;
    var value = req.body.value;
    BookProp.findOneAndUpdate({
      isbn: isbn
    }, {
      $push: {
        rates: {
          intrID: intrID,
          value: value
        }
      }
    }, function(err, book) {
      BookProp.findById({
        _id: book._id
      }, function(err, book_new) {
        res.send(book_new.rates);
      });
    })
  });

  app.put('/book/:isbn/comment', function(req, res) {
    var isbn = req.params.isbn;
    var intrID = req.body.intrID;
    var content = req.body.content;
    BookProp.update({
      isbn: isbn
    }, {
      $push: {
        comments: {
          intrID: intrID,
          content: content,
          time: Date.now()
        }
      }
    }, function(err, book) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        BookProp.findOne({
          isbn: isbn
        }, function(err, book_new) {
          if (err) {
            console.log(err);
            res.send(err);
          } else {
            res.send(book_new.comments);
          }
        });
      }
    })
  });

  // GetSimilarBooks
  app.get('/book/:isbn/similar', function(req, res) {
    var isbn = req.params.isbn;
    BookProp.findOne({
      isbn: isbn
    }, function(err, book) {
      if (err) {
        res.send(err);
      } else {
        var category = book.category;
        var simBooks = [];
        BookProp.find({
          category: category,
          isbn: {
            $ne: isbn
          },
          count: {
            $ne: 0
          },
        }, null, {
          limit: 4
        }, function(err, books) {
          console.log(books.length, 'books.length');
          for (var index in books) {
            simBooks.push(books[index]);
          };
          res.send(simBooks);
        });
      }
    });
  });

};
