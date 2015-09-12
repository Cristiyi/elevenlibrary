var booksControllers = angular.module('BookListCtrl', []);

booksControllers.controller('BookListCtrl', ['$scope','BookData',
	function($scope, BookData){
		$scope.books = BookData.query();
}]);
