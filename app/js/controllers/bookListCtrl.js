var bookListApp = angular.module('bookListApp', ['ui.router', 'wu.masonry', 'infinite-scroll', 'serviceApp']);
bookListApp.controller('MainBooksCtrl', function($scope, $state) {
  $scope.status = 0;

  function setState() {
    if ($state.current.name == "main.popular") {
      $scope.status = 1;
    } else if ($state.current.name == "main.allbooks") {
      $scope.status = 2;
    } else if ($state.current.name == "main.free") {
      $scope.status = 3;
    } else if ($state.current.name == "main.home") {
      $scope.status = 4;
    } else if ($state.current.name == "main.setting") {
      $scope.status = 5;
    } else if ($state.current.name == "main.liked") {
      $scope.status = 6;
    } else if ($state.current.name == "main.mybooks") {
      $scope.status = 7;
    };
  };
  $scope.$watch(function() {
    return $state.current.name
  }, function() {
    setState();
  });
});
bookListApp.controller('ShowPopularBooks', function($scope) {
  var books = new Array();
  var eachPageBooksCount = 10;
  $scope.books = new Array();
  $scope.showScrollToTop = false;

  function getBooks() {
    books = [];
    $scope.books = [];
    for (var i = 0; i < 100; i++) {
      var book = {
        "id": i,
        "likeNum": ~~(Math.random() * 50),
        "commentNum": ~~(Math.random() * 25),
        "isFree": i % 6 == 0 ? true : false,
        "src": "images/img (" + i + ").jpg"
      };
      if (book.likeNum >= 20) {
        books.push(book);
      }
    }
  };

  $scope.showMoreBooks = function showMoreBooks() {
    var start = $scope.books.length;
    var end = Math.min(start + 10, books.length);
    for (var i = start; i < end; i++) {
      $scope.books.push(books[i]);
    }
    if (start >= eachPageBooksCount * 2) {
      $scope.showScrollToTop = true;
    }
  };

  getBooks();
  $scope.showMoreBooks();
});

bookListApp.controller('ShowAllBooks', function($scope, $rootScope, BooksService) {
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

bookListApp.controller('ShowFreeBooks', function($scope) {
  var books = new Array();
  var eachPageBooksCount = 10;
  $scope.books = new Array();
  $scope.showScrollToTop = false;

  function getBooks() {
    books = [];
    $scope.books = [];
    for (var i = 0; i < 100; i++) {
      var book = {
        "id": i,
        "likeNum": ~~(Math.random() * 50),
        "commentNum": ~~(Math.random() * 25),
        "isFree": i % 2 == 0 ? true : false,
        "src": "images/img (" + i + ").jpg"
      };
      if (book.isFree) {
        books.push(book);
      }
    }
    console.log("FreeBooks loaded. Count = " + books.length);
  };

  $scope.showMoreBooks = function showMoreBooks() {
    var start = $scope.books.length;
    var end = Math.min(start + 10, books.length);
    for (var i = start; i < end; i++) {
      $scope.books.push(books[i]);
    }
    if (start >= eachPageBooksCount * 2) {
      $scope.showScrollToTop = true;
    }
  };

  getBooks();
  $scope.showMoreBooks();
});

bookListApp.controller('ShowMyBooks', function($scope) {
  var books = new Array();
  var eachPageBooksCount = 10;
  $scope.books = new Array();
  $scope.showScrollToTop = false;

  function getBooks() {
    books = [];
    $scope.books = [];
    var book1 = ~~(Math.random() * 99);
    var book2 = ~~(Math.random() * 99);
    var book3 = ~~(Math.random() * 99);
    for (var i = 0; i < 100; i++) {
      var book = {
        "id": i,
        "likeNum": ~~(Math.random() * 50),
        "commentNum": ~~(Math.random() * 25),
        "isFree": i % 6 == 0 ? true : false,
        "src": "images/img (" + i + ").jpg"
      };
      if (i == book1 || i == book2 || i == book3) {
        books.push(book);
      }
    }
    console.log("MyBooks loaded. Count = " + books.length);
  };

  $scope.showMoreBooks = function showMoreBooks() {
    var start = $scope.books.length;
    var end = Math.min(start + 10, books.length);
    for (var i = start; i < end; i++) {
      $scope.books.push(books[i]);
    }
    if (start >= eachPageBooksCount * 2) {
      $scope.showScrollToTop = true;
    }
  };

  getBooks();
  $scope.showMoreBooks();
});
