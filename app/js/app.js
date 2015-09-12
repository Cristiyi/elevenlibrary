var route = angular.module('main', [
    'ngRoute',
    'BookListCtrl',
    'ngService'
]);

route.config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'BookListCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });

        $locationProvider.html5Mode(true);
}]);
