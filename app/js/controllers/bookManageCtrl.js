var bookManageApp = angular.module('bookManageApp', []);

bookManageApp.controller('ManageBooksCtrl', function($scope, Book) {
  $scope.books = Book.query();
});

bookManageApp.controller('ManageBookCtrl', function($scope) {
  $scope.book = {};
});

bookManageApp.controller('NewBookCtrl', function($scope) {
  $scope.book = {};
})
