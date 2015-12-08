var Book = require('../models/Book.js');
var BookProp = require('../models/BookProp.js');

module.exports = function(app) {
  app.get('/books', function(req, res) {
    BookProp.find(function(err, books){
      res.send(books);
    })
  })
}
