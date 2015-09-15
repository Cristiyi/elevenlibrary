var bookListApp = angular.module('bookListApp', ['wu.masonry', 'infinite-scroll']);
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
        console.log("PopularBooks loaded. Count = " + books.length);
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

bookListApp.controller('ShowAllBooks', function($scope) {
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
            books.push(book);
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
