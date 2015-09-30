var mainApp = angular.module('mainApp', [
    'ui.router',
    'bookListApp',
    'bookDetailApp',
    'bookManageApp',
    'userApp'
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
		.state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
        })
		.state('register', {
            url: '/register',
            templateUrl: 'views/register.html',
            controller: 'RegCtrl'
        })
        .state('books.detail', {
            url:'/:bookId',
            templateUrl: 'views/detail.html',
            controller: 'BookDetailCtrl'
        })
        .state('manage-books', {
            url:'/manage-books',
            templateUrl: 'views/admin/admin-main.html',
            controller: 'ManageBooksCtrl'
        })
        .state('manage-book', {
            url:'/manage-book/:bookId',
            templateUrl: 'views/admin/admin-item.html',
            controller: 'ManageBookCtrl'
        })
        .state('new-book', {
            url:'/new-book',
            templateUrl: 'views/admin/admin-new.html',
            controller: 'NewBookCtrl'
        });
});
