var userApp = angular.module('userApp', []);
userApp.controller('LoginCtrl', function($scope, $http, $location) {
  $scope.user = {};
  $scope.login = function() {
    var user = {
      'intrID': $scope.user.intrID,
      'pwd': $scope.user.pwd
    };
    $http.post('/login', user)
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
