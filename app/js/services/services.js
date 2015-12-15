var serviceApp = angular.module('serviceApp', []);
serviceApp.factory('adminBooksService', function($http) {
  var books = [];
  return {
    addBook: function(book, success, error) {
      $http.post('/admin/books', book).success(success).error(error);
    },
    deleteOneBook: function(unqId, success, error) {
      $http.delete('/admin/book/' + unqId).success(success).error(error);
    },
    setBook: function(book, success, error) {
      $http.put('/admin/book/unqId', book).success(success).error(error);
    },
    getAllBooks: function(success, error){
      $http.get('/admin/books').success(success).error(error);
    },
    books: books
  };
});

serviceApp.factory('BooksService', function($http){
  var books = [];
  return{
    getAllBooks: function(){
      return $http.get('/books');
    },
    books: books
  }
})
