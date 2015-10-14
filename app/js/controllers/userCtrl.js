var userApp = angular.module('userApp', ['ngMessages', 'directApp']);
userApp.controller('LoginCtrl', function($scope, $rootScope, $http, $location, $timeout) {
  $scope.user = {};
  $scope.submitted = false;
  $scope.initState = function initState() {
    $scope.pwdError = false;
    $scope.userError = false;
    $scope.serverError = false;
  }
  $scope.login = function() {
    $scope.initState();
    if ($scope.loginForm.$valid) {
      var user = {
        'intrID': $scope.user.intrID,
        'pwd': $scope.user.pwd
      };
      $http.post('/login', user)
        .success(function(res) {
          console.log(res);
          if (res.errType === 0) {
            $location.path('#/home');
            $rootScope.logInUser.name = res.loginUser.name;
            $rootScope.logInUser.intrID = res.loginUser.intrID;
          } else if (res.errType === 1) {
            $scope.userError = true;
            $timeout($scope.initState, 3000);
          } else if (res.errType === 2) {
            $scope.pwdError = true;
            $timeout($scope.initState, 3000);
          } else {
            $scope.serverError = true;
            $timeout($scope.initState, 3000);
          };
        })
        .error(function(res) {
          $scope.serverError = true;
          $timeout($scope.initState, 3000);
        });
    } else {
      $scope.loginForm.submitted = true
    };
  };
});


userApp.controller('RegCtrl', function($scope, $rootScope, $http, $location, $timeout) {
  $scope.submitted = false;
  $scope.user = {};
  $scope.initState = function initState() {
    $scope.emailError = false;
    $scope.formatError = false;
    $scope.serverError = false;
  }
  $scope.register = function() {
    if ($scope.signupForm.$valid) {
      var user = {};
      if ($scope.user.phoneNum == null) {
        user = {
          'intrID': $scope.user.intrID,
          'name': $scope.user.name,
          'pwd': $scope.user.pwd
        };
      } else {
        user = {
          'intrID': $scope.user.intrID,
          'name': $scope.user.name,
          'pwd': $scope.user.pwd,
          'phoneNum': $scope.user.phoneNum
        };
      };
      console.log(user);
      $http.post('/register', user)
        .success(function(res) {
          if (res.errType === 0) {
            $location.path('#/books/home');
            $rootScope.logInUser.name = $scope.user.name;
            $rootScope.logInUser.intrID = $scope.user.intrID;
          } else if (res.errType === 1) {
            $scope.emailError = true;
            $timeout($scope.initState, 3000);
          } else if (res.errType === 2) {
            $scope.formatError = true;
            $timeout($scope.initState, 3000);
          } else {
            $scope.serverError = true;
            $timeout($scope.initState, 3000);
          };
        })
        .error(function(res) {
          $scope.serverError = true;
          $timeout($scope.initState, 3000);
        });
    } else {
      $scope.signupForm.submitted = true
    }
  };
});

userApp.controller('AdminLoginCtrl', function($scope, $http, $location) {
  $scope.user = {};
  $scope.login = function() {
    var user = {
      'intrID': 'libadmin@cn.ibm.com',
      'pwd': 'libadmin'
    };
    $http.post('/adminLogin', user)
      .success(function(res) {
        console.log(res);
        if (res.isSucc) {
          $location.path('/');
        }
      })
      .error(function(res) {
        console.log('Error: ' + res);
      });
  };
});
