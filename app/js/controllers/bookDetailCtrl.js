var bookDetailApp = angular.module('bookDetailApp', ['ui.router']);
bookDetailApp.controller('BookDetailCtrl', function($scope, $stateParams) {
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
