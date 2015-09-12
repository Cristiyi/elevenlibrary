var ngService = angular.module('ngService', ['ngResource'])
    .factory('BookData', function($resource) {
            return $resource('js/data/books.json', {}, {
            	query: {method:'GET', isArray:true}
            });
        });
