var mainApp = angular.module('mainApp', [
  'ui.router',
  'ngMessages',
  'wu.masonry',
  'bookListApp',
  'bookDetailApp',
  'userApp'
]);

mainApp.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/books/popular');

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
    .state('login', {
      url: '/login',
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'views/register.html',
      controller: 'RegCtrl'
    });
});

mainApp.run(function($rootScope) {
  $rootScope.logInUser = {
    'name': 'admin',
    'intrID': 'admin@cn.ibm.com',
    'likedBooks': [78, 79, 80, 81, 82, 83, 84, 85, 86, 67, 68, 69, 71, 72]
  };
  $rootScope.logOut = function logOut() {
    $rootScope.logInUser.name = '';
  };
});
