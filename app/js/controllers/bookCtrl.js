var bookApp = angular.module('bookApp', ['wu.masonry', 'infinite-scroll', 'serviceApp']);
bookApp.controller('MainBooksCtrl', function($scope) {});

bookApp.controller('AllBooksCtrl', function($scope, $rootScope, $state, $timeout, BooksService) {
  $scope.books = [];
  var eachPageBooksCount = 10;
  $scope.showScrollToTop = false;

  BooksService.getAllBooks()
    .success(function(res) {
      BooksService.books = [];
      console.log(res, 'AllBooks');
      for (var i = 0; i < res.length; i++) {
        res[i].image = res[i].image ? res[i].image : "images/gray.jpg";
        res[i].isLiked = false;
        for (var j = 0; j < res[i].likes.length; j++) {
          if (res[i].likes[j] === $rootScope.logInUser.intrID) {
            res[i].isLiked = true;
            break;
          };
        }
        BooksService.books.push(res[i]);
      };
      $scope.showMoreBooks();
    });

  var timeout;
  $scope.like = function(book) {
    if (!$rootScope.logInUser.intrID) {
      $state.go('login');
    } else {
      book.isLiked = !book.isLiked;
      if (timeout) $timeout.cancel(timeout);
      timeout = $timeout(function() {
        BooksService.likeBook(book.isbn, $rootScope.logInUser.intrID, book.isLiked).success(function(res) {
          console.log(res, 'like');
          book.likes = res;
          for (var i = 0; i < book.likes.length; i++) {
            if (book.likes[i] === $rootScope.logInUser.intrID) {
              book.isLiked = true;
              break;
            };
          };
        });
      }, 500);
    };
  };

  $scope.showMoreBooks = function showMoreBooks() {
    var start = $scope.books.length;
    var end = Math.min(start + 10, BooksService.books.length);
    for (var i = start; i < end; i++) {
      $scope.books.push(BooksService.books[i]);
    };
    if (start >= eachPageBooksCount * 2) {
      $scope.showScrollToTop = true;
    };
  };
});

bookApp.controller('DetailBookCtrl', function($scope, $rootScope, $timeout, $state, $location, BooksService) {
  $scope.book = {};
  $scope.isLiked = false;
  $scope.isRated = false;
  $scope.tarValue = 0;
  $scope.rateValue = 0;
  $scope.simBooks = [];
  $scope.popBooks = [];

  function analyseData() {
    var intrID = $rootScope.logInUser.intrID;
    for (var i = 0; i < $scope.book.likes.length; i++) {
      if ($scope.book.likes[i] === intrID) {
        $scope.isLiked = true;
        break;
      };
    };
    for (var i = 0; i < $scope.book.rates.length; i++) {
      if ($scope.book.rates[i].intrID === intrID) {
        $scope.isRated = true;
        $scope.rateValue = $scope.book.rates[i].value;
        break;
      };
    };
  }
  $('[data-toggle="tooltip"]').tooltip();

  BooksService.getOneBook($state.params.bookId, $rootScope.logInUser.intrID).success(function(res) {
    res.image = res.image ? res.image : "images/gray.jpg";
    $scope.book = res;
    analyseData();
  }).error(function(res) {
    console.log(res);
  });

  BooksService.getSimilarBooks($state.params.bookId).success(function(res) {
    $scope.simBooks = res;
  });

  BooksService.getPopularBooks($state.params.bookId).success(function(res) {
    $scope.popBooks = res;
  });

  $scope.borrow = function() {
    if (!$rootScope.logInUser.intrID) {
      $state.go('login');
    } else {
      BooksService.borrrowBook($scope.book.isbn, $rootScope.logInUser.intrID).success(function(res) {
        console.log(res, "BorrowBook");
        if (res.errType == 0) {
          $scope.book.intrID = $rootScope.logInUser.intrID;
          $scope.book.status = 1;
        } else if (res.errType == 1) {
          $('#warningModal').modal('show');
        } else if (res.errType == 2) {
          $('#noneModal').modal('show');
        } else if (res.errType == 3) {
          $('#errorModal').modal('show');
        }
      }).error(function(res) {
        console.log(res, "BorrowBook");
        $('#errorModal').modal('show');
      });
    };
  };

  var timeout;
  $scope.like = function() {
    if (!$rootScope.logInUser.intrID) {
      $state.go('login');
    } else {
      $scope.isLiked = !$scope.isLiked;
      if (timeout) $timeout.cancel(timeout);
      timeout = $timeout(function() {
        BooksService.likeBook($scope.book.isbn, $rootScope.logInUser.intrID, $scope.isLiked).success(function(res) {
          console.log(res, 'like');
          $scope.book.likes = res;
          analyseData();
        });
      }, 500);
    };
  };

  $scope.rate = function(value) {
    if (!$rootScope.logInUser.intrID) {
      $state.go('login');
    } else {
      $scope.tarValue = value;
      BooksService.rateBook($scope.book.isbn, $rootScope.logInUser.intrID, value).success(function(res) {
        console.log(res, 'rate');
        $scope.book.rates = res;
        analyseData();
      });
    };
  };

  $scope.comment = function() {
    if (!$rootScope.logInUser.intrID) {
      $state.go('login');
    } else if ($scope.content.length!=0){
      BooksService.commentBook($scope.book.isbn, $rootScope.logInUser.intrID, $scope.content).success(function(res) {
        console.log(res, 'comment');
        $scope.book.comments = res;
        $scope.content = '';
      });
    };
  }
});
