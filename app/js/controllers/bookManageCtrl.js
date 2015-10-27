var bookManageApp = angular.module('bookManageApp', []);

bookManageApp.controller('ManageCtrl', function($scope, adminBooksService) {
  $scope.books = adminBooksService.adminBooks;
});

bookManageApp.controller('ManageBooksCtrl', function($scope, $element, NgTableParams, adminBooksService) {


  $scope.setting = {
    'search': {
      'type': '0',
      'value': ''
    },
    'showStatusValue': '',
    'showAllFilters': false,
    'showPublisher': true,
    'showPageCount': true,
    'showPrice': true,
    'showLikes': true,
    'showComments': true,
    'showEvaluations': true
  };

  $scope.tableParams = new NgTableParams({
    count: 5
  }, {
    filterOptions: {
      filterComparator: false
    },
    counts: [5, 10, 25],
    dataset: $scope.books
  });

  $scope.checkboxes = {
    checked: false,
    items: {}
  };

  $scope.statuses = [{
    id: '',
    title: ''
  }, {
    id: 0,
    title: "free"
  }, {
    id: 1,
    title: "reserved"
  }, {
    id: 2,
    title: "borrowed"
  }];

  $scope.$watch(function() {
    return $scope.checkboxes.checked;
  }, function(value) {
    angular.forEach($scope.books, function(item) {
      $scope.checkboxes.items[item.unqId] = value;
    });
  });


  function settingSearch() {
    if ($scope.setting.search.type == '0') {
      $scope.tableParams.filter().unqId = $scope.setting.search.value;
      $scope.tableParams.filter().name = '';
      $scope.tableParams.filter().author = '';
      $scope.tableParams.filter().isbn = '';
    } else if ($scope.setting.search.type == '1') {
      $scope.tableParams.filter().name = $scope.setting.search.value;
      $scope.tableParams.filter().unqId = '';
      $scope.tableParams.filter().author = '';
      $scope.tableParams.filter().isbn = '';
    } else if ($scope.setting.search.type == '2') {
      $scope.tableParams.filter().author = $scope.setting.search.value;
      $scope.tableParams.filter().unqId = '';
      $scope.tableParams.filter().name = '';
      $scope.tableParams.filter().isbn = '';
    } else if ($scope.setting.search.type == '3') {
      $scope.tableParams.filter().isbn = $scope.setting.search.value;
      $scope.tableParams.filter().unqId = '';
      $scope.tableParams.filter().name = '';
      $scope.tableParams.filter().author = '';
    }
  };

  $scope.$watch(function() {
    return $scope.setting.search.type;
  }, function(values) {
    settingSearch();
  });

  $scope.$watch(function() {
    return $scope.setting.search.value;
  }, function(values) {
    settingSearch();
  });

  $scope.$watch(function() {
    return $scope.checkboxes.items;
  }, function(values) {
    var checked = 0,
      unchecked = 0,
      total = $scope.books.length;
    angular.forEach($scope.books, function(item) {
      checked += ($scope.checkboxes.items[item.unqId]) || 0;
      unchecked += (!$scope.checkboxes.items[item.unqId]) || 0;
    });
    if ((unchecked == 0) || (checked == 0)) {
      $scope.checkboxes.checked = (checked == total);
    };
    angular.element($element[0].getElementsByClassName("select-all")).prop("indeterminate", (checked != 0 && unchecked != 0));
  }, true);

  var defaultSetting = {
    'search': {
      'type': '0',
      'value': ''
    },
    'showStatusValue': '',
    'showAllFilters': false,
    'showPublisher': true,
    'showPageCount': true,
    'showPrice': true,
    'showLikes': true,
    'showComments': true,
    'showEvaluations': true,
    'showStrict': false
  };

  var currentSetting = {
    'search': {
      'type': '',
      'value': ''
    },
    'showStatusValue': '',
    'showAllFilters': false,
    'showPublisher': true,
    'showPageCount': true,
    'showPrice': true,
    'showLikes': true,
    'showComments': true,
    'showEvaluations': true,
    'showStrict': false
  };

  $scope.setTable = function setTable() {
    currentSetting.search.type = $scope.setting.search.type;
    currentSetting.search.value = $scope.setting.search.value;
    currentSetting.showStatusValue = $scope.tableParams.filter().status;
    currentSetting.showAllFilters = $scope.setting.showAllFilters;
    currentSetting.showPublisher = $scope.setting.showPublisher;
    currentSetting.showPageCount = $scope.setting.showPageCount;
    currentSetting.showPrice = $scope.setting.showPrice;
    currentSetting.showLikes = $scope.setting.showLikes;
    currentSetting.showComments = $scope.setting.showComments;
    currentSetting.showEvaluations = $scope.setting.showEvaluations;
    currentSetting.showStrict = $scope.tableParams.settings().filterOptions.filterComparator;
  };

  $scope.restoreTable = function restoreTable() {
    $scope.setting.search.type = defaultSetting.search.type;
    $scope.setting.search.value = defaultSetting.search.value;
    $scope.tableParams.filter().status = defaultSetting.showStatusValue;
    $scope.setting.showAllFilters = defaultSetting.showAllFilters;
    $scope.setting.showPublisher = defaultSetting.showPublisher;
    $scope.setting.showPageCount = defaultSetting.showPageCount;
    $scope.setting.showPrice = defaultSetting.showPrice;
    $scope.setting.showLikes = defaultSetting.showLikes;
    $scope.setting.showComments = defaultSetting.showComments;
    $scope.setting.showEvaluations = defaultSetting.showEvaluations;
    $scope.tableParams.settings().filterOptions.filterComparator = defaultSetting.showStrict;
  };

  $scope.cancelTable = function cancelTable() {
    $scope.setting.search.type = currentSetting.search.type;
    $scope.setting.search.value = currentSetting.search.value;
    $scope.tableParams.filter().status = currentSetting.showStatusValue;
    $scope.setting.showAllFilters = currentSetting.showAllFilters;
    $scope.setting.showPublisher = currentSetting.showPublisher;
    $scope.setting.showPageCount = currentSetting.showPageCount;
    $scope.setting.showPrice = currentSetting.showPrice;
    $scope.setting.showLikes = currentSetting.showLikes;
    $scope.setting.showComments = currentSetting.showComments;
    $scope.setting.showEvaluations = currentSetting.showEvaluations;
    $scope.tableParams.settings().filterOptions.filterComparator = currentSetting.showStrict;
  };

  $scope.deleteBooks = function deleteBooks(){
  };
});

bookManageApp.controller('ManageBookCtrl', function($scope, $http) {});

bookManageApp.controller('NewBookCtrl', function($scope, $http, $timeout, $location) {
  $scope.book = {};
  $scope.book.image = "http://www.w3cfuns.com/data/attachment/forum/201402/21/110314oj7snopjo7qq3u7u.jpg";
  $scope.addBook = function addBook() {
    $('#addButton').button('loading');
    $timeout(function() {
      $('#addButton').button('reset');
    }, 3000);
  };
});
