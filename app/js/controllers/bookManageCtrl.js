var bookManageApp = angular.module('bookManageApp', []);

bookManageApp.controller('ManageBooksCtrl', function($scope) {
  $scope.books = [];
});

bookManageApp.controller('ManageBookCtrl', function($scope) {
  $scope.book = {};
});

bookManageApp.controller('NewBookCtrl', function($scope) {
  $scope.book = {};
})
