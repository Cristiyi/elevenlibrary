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

bookManageApp.controller('ManageBookCtrl', function($scope) {
  $scope.book = [];
});

bookManageApp.controller('NewBookCtrl', function($scope, $http) {
  var book = {
    name: $scope.name
  }
  $scope.addBook = function() {
    console.log("NewBooks info >>" + book.name);
    $http.post('/manage-books', book)
      .success(function(data) {
        $scope.book = data;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };

});
