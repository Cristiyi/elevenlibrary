var bookManageApp = angular.module('bookManageApp', ['ngTable']);

bookManageApp.controller('ManageBooksCtrl', function($scope, NgTableParams) {
  var self = $scope;
  var data = [{name: "Moroni", age: 50},
      {name: "Simon", age: 43},
      {name: "Jacob", age: 27},
      {name: "Nephi", age: 29},
      {name: "Christian", age: 34},
      {name: "Tiancum", age: 43},
      {name: "Jacob", age: 27}
  ];
  self.tableParams = new NgTableParams({ count: 5}, { counts: [5, 10, 25], dataset: data});
});

bookManageApp.controller('ManageBookCtrl', function($scope, $http) {
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
