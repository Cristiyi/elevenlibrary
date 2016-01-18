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
    getSimilarBooks: function(isbn){
      return $http.get('/book/' + isbn + '/similar');
    },
    borrrowBook: function(isbn, intrID){
      return $http.put('/book/' + isbn + '/borrow', {intrID: intrID});
    },
    likeBook: function(isbn, intrID, ifYou){
      return $http.put('/book/' + isbn + '/like', {intrID: intrID, ifYou: ifYou});
    },
    rateBook: function(isbn, intrID, value){
      return $http.put('/book/' + isbn + '/rate', {intrID: intrID, value: value});
    },
    commentBook: function(isbn, intrID, content){
      return $http.put('/book/' + isbn + '/comment', {intrID: intrID, content: content});
    },
    books: books
  }
});

serviceApp.factory('EventsService', function($http){
  var events = [];
  return {
    getAllEvents: function(){
      return $http.get('/admin/events');
    },
    acceptEvent: function(unqId, intrId){
      return $http.put('/admin/events/' + unqId, {intrId: intrId});
    },
    returnEvent: function(unqId){
      return $http.post('/admin/events/' + unqId);
    },
    events: events
  }
})

serviceApp.constant('category', {
  'Frontend': '1',
  'Backend':'2',
  'Database': '3',
  'Big Data': '4',
  'IOS/Android': '5',
  'UI Design': '6',
  'Other': '7'
});
