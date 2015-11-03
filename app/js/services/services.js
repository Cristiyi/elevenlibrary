var serviceApp = angular.module('serviceApp', []);
serviceApp.factory('adminBooksService', function($http) {
  return {
    addBook: function(book, success, error) {
      $http.post('/admin/books', book).success(success).error(error);
    },
    deleteOneBook: function(unqId, success, error) {
      $http.delete('/admin/book/' + unqId).success(success).error(error);
    },
    setBook: function(book, success, error) {
      $http.put('/admin/book/unqId', book).success(success).error(error);
    },
    getAllBooks: [{
      unqId: 'a-1',
      name: 'About.Face.3：The.Essentials.of.Interaction.Design',
      image: 'http://www.w3cfuns.com/data/attachment/forum/201503/05/111905t4agsmdfgh6n9e8a.jpg',
      author: 'Alan Cooper',
      isbn: '9780470084113',
      publisher: 'Publisher1',
      pageCount: 637,
      price: 309.2,
      likeNum: 15,
      commentNum: 3,
      evaluation: {
        number: 18,
        value: 3.5
      },
      status: 0
    }, {
      unqId: 'a-2',
      name: 'Practical CSS3：Developand Design',
      image: 'http://www.w3cfuns.com/data/attachment/forum/201402/08/172142lty8b446gjaeejk7.jpg',
      author: 'Chris Mills',
      isbn: '9787111426516',
      publisher: 'China Machine Press',
      pageCount: 240,
      price: 59,
      likeNum: 18,
      commentNum: 30,
      evaluation: {
        number: 25,
        value: 4.5
      },
      status: 1
    }, {
      unqId: 'a-3',
      name: 'Head First Web设计',
      image: 'http://www.w3cfuns.com/data/attachment/forum/201311/03/164656x19ee4a9zea5fglq.jpg',
      author: 'Ethan Watrall & Jeff Siarto',
      isbn: '9787564124724',
      publisher: 'O\'Reilly Media',
      pageCount: 451,
      price: 47,
      likeNum: 13,
      commentNum: 23,
      evaluation: {
        number: 16,
        value: 4.0
      },
      status: 2
    }, {
      unqId: 'a-4',
      name: 'Node.js开发指南',
      image: 'http://www.w3cfuns.com/data/attachment/forum/201211/28/130616mfcmsrcbmzifbfmm.png',
      author: 'BYVoid',
      isbn: '9787115283993',
      publisher: '人民邮电出版社',
      pageCount: 200,
      price: 45,
      likeNum: 24,
      commentNum: 32,
      evaluation: {
        number: 43,
        value: 4.5
      },
      status: 2
    }, {
      unqId: 'a-5',
      name: '变幻之美-DIV+CSS网页布局揭秘--案例实战篇',
      image: 'http://www.w3cfuns.com/data/attachment/forum/201208/13/221014uanvnwg6vahgh6z0.jpg',
      author: '金峰',
      isbn: '9387145283923',
      publisher: '人民邮电出版社',
      pageCount: 658,
      price: 43,
      likeNum: 22,
      commentNum: 5,
      evaluation: {
        number: 21,
        value: 2.5
      },
      status: 1
    }, {
      unqId: 'a-6',
      name: 'JavaScript开发技术大全',
      image: 'http://www.w3cfuns.com/data/attachment/forum/201208/13/20305911xh418s631d5h39.jpg',
      author: '刘智勇',
      isbn: '9152145213223',
      publisher: '清华大学',
      pageCount: 760,
      price: 65,
      likeNum: 20,
      commentNum: 30,
      evaluation: {
        number: 10,
        value: 3.5
      },
      status: 0
    }]
  };
});
