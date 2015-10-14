var mainApp = angular.module('mainApp', [
  'ngAnimate',
  'ui.router',
  'ngMessages',
  'wu.masonry',
  'bookListApp',
  'bookDetailApp',
  'bookManageApp',
  'userApp'
]);

mainApp.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/books/popular');

  << << << < HEAD
  $stateProvider
    .state('main', {
      url: '',
      templateUrl: 'views/main.html'
    })
    .state('main.popular', {
      url: '/books/popular',
      templateUrl: 'views/popular.html',
      controller: 'ShowPopularBooks'
    })
    .state('main.allbooks', {
      url: '/books/allbooks',
      templateUrl: 'views/allbooks.html',
      controller: 'ShowAllBooks'
    })
    .state('main.free', {
      url: '/books/free',
      templateUrl: 'views/free.html',
      controller: 'ShowFreeBooks'
    })
    .state('main.liked', {
      url: '/books/liked',
      templateUrl: 'views/popular.html',
      controller: 'ShowPopularBooks'
    })
    .state('main.mybooks', {
      url: '/books/mybooks',
      templateUrl: 'views/mybooks.html',
      controller: 'ShowMyBooks'
    })
    .state('main.detail', {
      url: '/books/:bookId',
      templateUrl: 'views/detail.html',
      controller: 'BookDetailCtrl'
    })
    .state('main.home', {
      url: '/home',
      templateUrl: 'views/home.html',
      controller: 'ShowMyBooks'
    })
    .state('main.setting', {
      url: '/setting',
      templateUrl: 'views/setting.html',
      controller: 'ShowMyBooks'
    })
    .state('manage', {
      url: '',
      templateUrl: 'views/admin/admin-main.html'
    })
    .state('manage.users', {
      url: '/manage/users',
      templateUrl: 'views/admin/admin-users.html'
    })
    .state('manage.logs', {
      url: '/manage/logs',
      templateUrl: 'views/admin/admin-logs.html'
    })
    .state('manage.books', {
      url: '/manage/books',
      templateUrl: 'views/admin/admin-books.html',
      controller: 'ManageBooksCtrl'
    })
    .state('manage.newBook', {
      url: '/manage/newBook',
      templateUrl: 'views/admin/admin-new.html',
      controller: 'NewBookCtrl'
    })
    .state('manage.detail', {
      url: '/manage/:bookId',
      templateUrl: 'views/admin/admin-item.html',
      controller: 'ManageBookCtrl'
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
    .state('adminlogin', {
      url: '/adminlogin',
      templateUrl: 'views/adminlogin.html',
      controller: 'AdminLoginCtrl'
    });;
});

mainApp.run(function($rootScope) {
  $rootScope.logInUser = {
    'name': '',
    'intrID': '',
    'likedBooks': [78, 79, 80, 81, 82, 83, 84, 85, 86, 67, 68, 69, 71, 72]
  };
  $rootScope.logOut = function logOut() {
    $rootScope.logInUser.name = '';
    $rootScope.logInUser.intrID = '';
  };
});
