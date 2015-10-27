var serviceApp = angular.module('serviceApp', []);
serviceApp.factory('adminBooksService', function($http) {
  // return {
  //   adminBooks: function() {
  //     return $http({
  //       method: 'GET',
  //       url: '/admin/books'
  //     });
  //   }
  // };
  return {
    adminBooks: [{
      unqId: '1',
      name: 'book1',
      author: 'author1',
      isbn: '001',
      publisher: 'publisher1',
      pageCount: 1000,
      price: 30,
      likeNum: 20,
      commentNum: 30,
      evaluation: {
        number: 10,
        value: 3.5
      },
      status: 0
    }, {
      unqId: '2',
      name: 'book2',
      author: 'author2',
      isbn: '002',
      publisher: 'publisher2',
      pageCount: 1000,
      price: 30,
      likeNum: 20,
      commentNum: 30,
      evaluation: {
        number: 10,
        value: 3.5
      },
      status: 1
    }, {
      unqId: '3',
      name: 'book3',
      author: 'author3',
      isbn: '003',
      publisher: 'publisher3',
      pageCount: 1000,
      price: 30,
      likeNum: 20,
      commentNum: 30,
      evaluation: {
        number: 10,
        value: 3.5
      },
      status: 2
    }, {
      unqId: '4',
      name: 'book4',
      author: 'author4',
      isbn: '004',
      publisher: 'publisher4',
      pageCount: 1000,
      price: 30,
      likeNum: 20,
      commentNum: 30,
      evaluation: {
        number: 10,
        value: 3.5
      },
      status: 1
    }, {
      unqId: '5',
      name: 'book5',
      author: 'author5',
      isbn: '005',
      publisher: 'publisher5',
      pageCount: 1000,
      price: 30,
      likeNum: 20,
      commentNum: 30,
      evaluation: {
        number: 10,
        value: 3.5
      },
      status: 2
    }, {
      unqId: '6',
      name: 'book6',
      author: 'author6',
      isbn: '006',
      publisher: 'publisher6',
      pageCount: 1000,
      price: 30,
      likeNum: 20,
      commentNum: 30,
      evaluation: {
        number: 10,
        value: 3.5
      },
      status: 0
    }, {
  unqId: '7',
  name: 'book7',
  author: 'author7',
  isbn: '007',
  publisher: 'publisher7',
  pageCount: 1000,
  price: 30,
  likeNum: 20,
  commentNum: 30,
  evaluation: {
    number: 10,
    value: 3.5
  },
  status: 0
}
]
  }
});
