var serviceApp = angular.module('serviceApp', []);
serviceApp.factory('adminBooksService', function($http) {
  return {
    addBook: function(book, success, error) {
      $http.post('/admin/books', book).success(success).error(error);
    },
    deleteOneBook: function(unqId, success, error) {
      $http.delete('/admin/book/unqId').success(success).error(error);
    },
    setBook: function(book, success, error) {
      $http.put('/admin/book/unqId', book).success(success).error(error);
    },

  };
});
