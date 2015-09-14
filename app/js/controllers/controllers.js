angular.module('bookListApp', ['wu.masonry', 'infinite-scroll', ]).
controller('bookListCtrl', function($scope, $window) {
    var allBooks = new Array();
    var eachPageBooksCount = 10;
    var isLoading = false;
    var booktype = ['all', 'popular', 'free', 'me'];
    $scope.books = new Array();
    $scope.showScrollToTop = false;

    function getAllBooks(type) {
        allBooks = [];
        $scope.books = [];
        for (var i = 0; i < 100; i++) {
            var book = {
                "id": i,
                "likeNum": ~~(Math.random() * 50),
                "commentNum": ~~(Math.random() * 25),
                "isFree": i % 6 == 0 ? true : false,
                "src": "images/img (" + i + ").jpg"
            };
            if (type == booktype[1] && book.likeNum >= 20) {
                allBooks.push(book);
            } else if (type == booktype[2] && book.isFree) {
                allBooks.push(book);
            } else if (type == booktype[3] && book.id < 5) {
                allBooks.push(book);
            } else if (type == booktype[0]) {
                allBooks.push(book);
            }
        }
        console.log("AllBooks loaded. Length = " + allBooks.length);
    };

    $scope.showMoreBooks = function showMoreBooks() {
        isLoading = true;
        var start = $scope.books.length;
        var end = Math.min(start + 10, allBooks.length);
        for (var i = start; i < end; i++) {
            $scope.books.push(allBooks[i]);
        }
        isLoading = false;
        if (start >= eachPageBooksCount*2){
            $scope.showScrollToTop = true;
        }
        console.log("ShownBooks loaded. Length = " + $scope.books.length);
    };


    $scope.showAllBooks = function showAllBooks() {
        getAllBooks(booktype[0]);
        $scope.showMoreBooks();
    };

    $scope.showPopularBooks = function showPopularBooks() {
        getAllBooks(booktype[1]);
        $scope.showMoreBooks();
    };

    $scope.showFreeBooks = function showFreeBooks() {
        getAllBooks(booktype[2]);
        $scope.showMoreBooks();
    };

    $scope.showMyBooks = function showMyBooks() {
        getAllBooks(booktype[3]);
        $scope.showMoreBooks();
    };

    $scope.scrollToTop = function scrollToTop(){
        $window.scrollTo(0,0);
        $scope.showScrollToTop = false;
    }

    $scope.showAllBooks();
});
