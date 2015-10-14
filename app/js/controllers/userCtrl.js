var userApp = angular.module('userApp', ['ngMessages', 'directApp']);
userApp.controller('LoginCtrl', function($scope, $rootScope, $http, $location) {
  $scope.user = {};
  $scope.login = function() {
    if ($scope.loginForm.$valid) {
      var user = {
        'intrID': $scope.user.intrID,
        'pwd': $scope.user.pwd
      };
      $http.post('/login', user)
        .success(function(res) {
          console.log(res);
          if (res.errType == 0) {
            $location.path('#/books/popular');
            $rootScope.logInUser.name = res.name;
            $rootScope.logInUser.intrID = $scope.user.intrID;
          }
        })
        .error(function(res) {
          console.log('Error: ' + res);
        });
    } else {
      console.log('Error: loginForm.$valid = ' + $scope.loginForm.$valid);
    };
  };
});


userApp.controller('RegCtrl', function($scope, $rootScope, $http, $location) {
  $scope.submitted = false;
  $scope.user = {};
  $scope.register = function() {
    console.log('>>>click');
    if ($scope.signupForm.$valid) {
      var user = {
        'intrID': $scope.user.intrID,
        'pwd': $scope.user.pwd,
        'name': $scope.user.name
      };
      console.log(user);
      $http.post('/register', user)
        .success(function(res) {
          if (res.errType == 0) {
            $location.path('#/books/popular');
            $rootScope.logInUser.name = $scope.user.name;
            $rootScope.logInUser.intrID = $scope.user.intrID;
          }
        })
        .error(function(res) {
          console.log('Error: ' + res.isSucc);
        });
    } else {
      $scope.signupForm.submitted = true
    }
  };
});
