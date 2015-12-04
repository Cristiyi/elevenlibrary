var Book = require('../models/Book.js');
var BookProp = require('../models/BookProp.js');
var History = require('../models/History.js');

module.exports = function(app) {
	app.get('/admin/books', function(req, res){
		Book.find(function(err, books){
			if(err){
				console.log("[Query books] DB error !");
			}else{
				var jbooks = JSON.parse(JSON.stringify(books));
				BookProp.find(function(err, booksprop){
					if(err){
						console.log("[Query BookProp] DB error !");
					}else{
						var jbooksprop = JSON.parse(JSON.stringify(booksprop));
					}

					for (var i = jbooks.length - 1; i >= 0; i--) {
						for (var m = jbooksprop.length - 1; m >= 0; m--) {
							if(jbooksprop[m].isbn == jbooks[i].isbn){
								
								jbooks[i].basicInfo.push(JSON.parse(JSON.stringify(jbooksprop[m])));
								break;
							}
						};
					};//for
					// console.log(jbooks);
					// console.log(jbooks[0].basicInfo[0].name);
					res.json(jbooks);
				});//booksprop
			}
		});//books
		
	});// add one book

};