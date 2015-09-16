var mainApp = angular.module('mainApp', [
    'ui.router',
    'bookListApp',
    'bookDetailApp'
]);

mainApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/books/popular');

    $stateProvider
        .state('books', {
            url: '/books',
            templateUrl: 'views/main.html'
        })
        .state('books.popular', {
            url: '/popular',
            templateUrl: 'views/popular.html',
            controller: 'ShowPopularBooks'
        })
        .state('books.allbooks', {
            url: '/allbooks',
            templateUrl: 'views/allbooks.html',
            controller: 'ShowAllBooks'
        })
        .state('books.free', {
            url: '/free',
            templateUrl: 'views/free.html',
            controller: 'ShowFreeBooks'
        })
        .state('books.mybooks', {
            url: '/mybooks',
            templateUrl: 'views/mybooks.html',
            controller: 'ShowMyBooks'
        })
        .state('books.detail', {
            url:'/:bookId',
            templateUrl: 'views/detail.html',
            controller: 'BookDetailCtrl'
        });
});
