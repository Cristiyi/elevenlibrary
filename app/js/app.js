var mainApp = angular.module('mainApp', [
  'ui.router',
  'bookApp',
  'adminApp',
  'userApp'
]);

mainApp.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/books');

  $stateProvider
    .state('main', {
      url: '',
      templateUrl: 'views/book/main.html',
      controller: 'MainBooksCtrl'
    })
    .state('main.list', {
      url: '/books',
      templateUrl: 'views/book/allbooks.html',
      controller: 'AllBooksCtrl'
    })
    .state('main.detail', {
      url: '/book/:bookId',
      templateUrl: 'views/book/detailbook.html',
      controller: 'DetailBookCtrl'
    })
    .state('main.home', {
      url: '/home',
      templateUrl: 'views/user/home.html',
      controller: 'UserHomeCtrl'
    })
    .state('main.setting', {
      url: '/setting',
      templateUrl: 'views/user/setting.html',
    })
    .state('login', {
      url: '/login',
      templateUrl: 'views/user/login.html',
      controller: 'LoginCtrl'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'views/user/register.html',
      controller: 'RegCtrl'
    })
    .state('manage', {
      url: '',
      templateUrl: 'views/admin/admin-main.html',
      controller: 'ManageCtrl'
    })
    .state('manage.books', {
      url: '/manage/books',
      templateUrl: 'views/admin/admin-books.html',
      controller: 'ManageBooksCtrl'
    })
    .state('manage.events', {
      url: '/manage/events',
      templateUrl: 'views/admin/admin-events.html',
      controller: 'ManageEventsCtrl'
    })
    .state('manage.logs', {
      url: '/manage/logs',
      templateUrl: 'views/admin/admin-logs.html'
    })
    .state('manage.newBook', {
      url: '/manage/newBook',
      templateUrl: 'views/admin/admin-new.html',
      controller: 'NewBookCtrl'
    })
    .state('manage.detail', {
      url: '/manage/book/:bookId',
      templateUrl: 'views/admin/admin-item.html',
      controller: 'ManageBookCtrl'
    })
    .state('adminLogin', {
      url: '/adminLogin',
      templateUrl: 'views/admin/adminlogin.html',
      controller: 'AdminLoginCtrl'
    });
});

mainApp.run(function($rootScope, $window, $http, $location) {
  $rootScope.logInUser = {
    'name': $window.localStorage.name ? $window.localStorage.name : '',
    'intrID': $window.localStorage.intrID ? $window.localStorage.intrID : '',
    'phoneNum': '',
    'likedBooks': [78, 79, 80, 81, 82, 83, 84, 85, 86, 67, 68, 69, 71, 72]
  };
  $rootScope.logOut = function logOut() {
    $rootScope.logInUser = {};
    $window.localStorage.clear();
    delete $window.sessionStorage.token;
  };

  //test token
  $rootScope.callRestricted = function callRestricted() {
    $http({
        url: '/elib/restricted',
        method: 'GET'
      })
      .success(function(data, status, headers, config) {
        console.log("[callRestricted]still in seesion");

      });
    // .error(function (data, status, headers, config) {
    //   console.log(data);

    // });
  }; //test token
});

mainApp.factory('authInterceptor', function($rootScope, $q, $window, $location) {
  return {
    request: function(config) {
      config.headers = config.headers || {};
      if ($rootScope.logInUser.intrID) {

        config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
      }
      return config;
    },
    responseError: function(rejection) {

      if (rejection.status === 401) {
        // handle the case where the user is not authenticated
        console.log("[responseError]session timeout");
        $location.path('/login');
      }
      return $q.reject(rejection);
    }
  };
});

mainApp.config(function($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});
