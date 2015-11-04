var userApp = angular.module('userApp', ['ngMessages', 'directApp']);
userApp.controller('LoginCtrl', function($scope, $rootScope, $http, $location, $timeout, $window) {
  $scope.user = {};
  $scope.submitted = false;
  $scope.initState = function initState() {
    $scope.pwdError = false;
    $scope.userError = false;
    $scope.serverError = false;
    $scope.loginForm.submitted = false;

  }

  $scope.login = function() {
    $scope.initState();
    if ($scope.loginForm.$valid) {
      var user = {
        'intrID': $scope.user.intrID,
        'pwd': $scope.user.pwd
      };
      $http.post('/login', user)
      .success(function(res, status, headers, config) {

        if (res.errType === 0) {

          $window.sessionStorage.token = res.token;
          $location.path('/books/popular');
          //$rootScope.logInUser.name = res.loginUser.name;
          $rootScope.logInUser.intrID = user.intrID;

          $window.localStorage.setItem('intrID', $scope.user.intrID);
          //$window.localStorage.setItem('pwd', $scope.user.pwd);
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
        delete $window.sessionStorage.token;
        $scope.serverError = true;
        $timeout($scope.initState, 3000);
      });
    } else {
      $scope.loginForm.submitted = true;
      $timeout($scope.initState, 3000);
    };
  };

});


userApp.controller('RegCtrl', function($scope, $rootScope, $http, $location, $timeout, $window) {
  $scope.submitted = false;
  $scope.user = {};
  $scope.initState = function initState() {
    $scope.emailError = false;
    $scope.formatError = false;
    $scope.serverError = false;
    $scope.signupForm.submitted = false;
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
      $http.post('/register', user)
      .success(function(res) {
        console.log(res);
        if (res.errType === 0) {
          $window.sessionStorage.token = res.token;
          $location.path('/books/popular');
          $rootScope.logInUser.intrID = user.intrID;
          $window.localStorage.setItem('intrID', $scope.user.intrID);

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
      $scope.signupForm.submitted = true;
      $timeout($scope.initState, 3000);
    }
  };
});

/* Admin log in*/
userApp.controller('AdminLoginCtrl', function($scope, $http, $location, $timeout) {
  $scope.user = {};
  $scope.submitted = false;
  $scope.initState = function initState() {
    $scope.adminemailError = false;
    $scope.adminloginError = false;
    $scope.serverError = false;
  }

  $scope.login = function() {
    $scope.initState();
    var user = {
      'intrID': $scope.user.intrID,
      'pwd': $scope.user.pwd
    };

    $http.post('/adminLogin', user)
    .success(function(res) {
     if (res.errType === 0) {
      $location.path('/manage/books');
    }
    else if (res.errType === 1) {
      $scope.adminemailError = true;
      $timeout($scope.initState, 3000);
    }
    else {
      $scope.adminloginError = true;
      $timeout($scope.adminloginError, 3000);
    }
  })
    .error(function(res) {
      $scope.serverError = true;
      $timeout($scope.initState, 3000);
      console.log('Error: ' + res);
    });
  };
});
