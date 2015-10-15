var bookManageApp = angular.module('bookManageApp', []);

bookManageApp.controller('ManageBooksCtrl', function($scope, $http) {
  $scope.getAllBooks = function() {
    $scope.books = {};
    $http.get('/manage-books')
      .success(function(data) {
        $scope.books = data;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };
  $scope.deleteAllBooks = function() {
    $http.delete('/manage-books').success();
    $scope.getAllBooks();
  };
  $scope.getAllBooks();
});

bookManageApp.controller('ManageBookCtrl', function($scope, $) {
  $scope.getBook = function() {
    $scope.book = {};
    $http.get('/manage/')
      .success(function(data) {
        $scope.book = data;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };
});

bookManageApp.controller('NewBookCtrl', function($scope, $http, $location) {
  $scope.book = {};
  $scope.addBook = function addBook() {
    var book = {
      'name': $scope.book.name,
      'likeNum': $scope.book.likeNum,
      'commentNum': $scope.book.commentNum,
      'isFree': $scope.book.isFree
    };
    $http.post('/manage-books', book)
      .success(function(data) {
        $scope.book = data;
        $location.path('#/manage/books');
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };

});
