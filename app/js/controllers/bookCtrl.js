var bookApp = angular.module('bookApp', ['wu.masonry', 'infinite-scroll', 'serviceApp']);
bookApp.controller('MainBooksCtrl', function($scope) {});

bookApp.controller('AllBooksCtrl', function($scope, $rootScope, BooksService) {
  $scope.books = [];
  var eachPageBooksCount = 10;
  $scope.showScrollToTop = false;

  BooksService.getAllBooks()
    .success(function(res) {
      console.log(res);
      BooksService.books = [];
      for (var i = 0; i < res.length; i++) {
        res[i].image = res[i].image ? res[i].image : "images/gray.jpg"
        BooksService.books.push(res[i]);
      }
      $scope.showMoreBooks();
    });
  console.log("AllBooks loaded. Count = " + BooksService.books.length);

  $scope.showMoreBooks = function showMoreBooks() {
    var start = $scope.books.length;
    var end = Math.min(start + 10, BooksService.books.length);
    for (var i = start; i < end; i++) {
      $scope.books.push(BooksService.books[i]);
    }
    if (start >= eachPageBooksCount * 2) {
      $scope.showScrollToTop = true;
    }
  };

});

bookApp.controller('DetailBookCtrl', function($scope, $stateParams, $location, BooksService) {
  $scope.book = {};

  function initBook() {
    for (var index = 0; index < BooksService.books.length; index++) {
      if (BooksService.books[index].isbn == $stateParams.bookId) {
        $scope.book = BooksService.books[index];
        console.log($scope.book);
        break;
      }
    };
  };
  initBook();
});
