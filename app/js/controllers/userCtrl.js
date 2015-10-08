var userApp = angular.module('userApp', ['ngMessages']);
userApp.controller('LoginCtrl', function($scope, $rootScope, $http, $location) {
  $scope.user = {};
  $scope.login = function() {
          $location.path('/');
      $rootScope.logInUser.name = $scope.user.intrID;
      console.log('logInUser.name=' + $rootScope.logInUser.name);
/*
    if ($scope.loginForm.$valid) {
      var user = {
        'intrID': $scope.user.intrID,
        'pwd': $scope.user.pwd
      };
      $location.path('/');
      $rootScope.logInUser.name = $scope.user.intrID;
      $http.post('/login', user)
        .success(function(res) {
          console.log(res);
          if (res.isSucc) {
            $location.path('/');
            $rootScope.logInUser.name = $scope.user.intrID;
          }
        })
        .error(function(res) {
          console.log('Error: ' + res);
        });
    } else {
      console.log('Error: loginForm.$valid = ' + $scope.loginForm.$valid);
    };*/
  };
});


userApp.controller('RegCtrl', function($scope, $http, $location) {
  $scope.user = {};
  $scope.register = function() {
    var user = {
      'intrID': $scope.user.intrID,
      'pwd': $scope.user.pwd,
      'name': $scope.user.name
    };
    console.log(user);
    $http.post('/register', user)
      .success(function(res) {
        if (res.isSucc) {
          $location.path('/');
        }
      })
      .error(function(res) {
        console.log('Error: ' + res.isSucc);
      });
  };
});
