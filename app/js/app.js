var route = angular.module('main', [
	'ngRoute',
	'ngResource'
	]);

route.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: function() {
                console.log('finished injecting home.html');
            }
        })
        .otherwise({
            redirectTo: '/'
        });
}]);
