var bookDetailApp = angular.module('bookDetailApp', ['ui.router', 'serviceApp']);
bookDetailApp.controller('BookDetailCtrl', function($scope, $stateParams, $location, BooksService) {
  $scope.book = {};

  function initBook() {
    console.log(BooksService.books);
    for (var index = 0; index < BooksService.books.length; index++) {
      if (BooksService.books[index].isbn == $stateParams.bookId) {
        $scope.book = BooksService.books[index];
        console.log($scope.book);
        break;
      }
    };
  };
  initBook();
  console.log(BooksService.books.length);
});
bookDetailApp.controller('BookTempDetailCtrl', function($scope, $stateParams) {
    var book = {
        "id": $stateParams.bookId,
        "title": "This is The Book Name",
        "likeNum": ~~(Math.random() * 50),
        "commentNum": ~~(Math.random() * 25),
        "isFree": $stateParams.bookId % 6 == 0 ? true : false,
        "src": "images/img (" + $stateParams.bookId + ").jpg"
    };
    $scope.book = book;
});
