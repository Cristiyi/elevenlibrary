var Book = require('../models/Book.js');
var BookProp = require('../models/BookProp.js');

module.exports = function(app) {
	app.post('/admin/books', function(req, res){
		console.log(req.body);
		var param = req.body;

		// status: param.status==0?param.status:0, //0-free,1-reserved,2-borrowed
		var newBook = {
			unqId: param.unqId,
			isbn: param.isbn,
			status: 0,
			name: param.name,
			intrID: param.intrID,
			isDeleted: 0, //0-exist,1-deleted
		};


		Book.findOne({
			unqId : newBook.unqId
		}, function(err, book){
			if(err) {
	          console.log('[Add a book]DB find a book err : '+ err);
	          res.json({
	            'errType': 3
	          });
	        }
	        else if(book){
				console.log('[Add a book]This book exists');
	            res.json({
	              'errType': 1
	            });
	        }else{
	        	Book.create(newBook, function(err, newBook){
	        		if(err) {
						console.log('[Add a book]DB insert book err : '+ err);
						res.json({
							'errType': 3
						});
		            }
		            else if(!newBook){
		            	console.log('[Add a book]DB insert book Fail');
		            	res.json({
			                'errType': 3
			            });
		            }else{
		            	BookProp.findOne({
		            		isbn: newBook.isbn
		            	}, function(err, bookprop){
		            		if(err) {
								console.log('[Add a book]Find isbn err : '+ err);
								res.json({
									'errType': 3
								});
				            }
				            else if(bookprop){
				            	BookProp.update({isbn: bookprop.isbn},{count: bookprop.count+1}, function(err, bookprop1){
				            		if(err){
				            			console.log('[Update bookProp]update bookprop count err : ' + err);
										res.json({
											'errType': 3
										});
				            		}
				            		else if(bookprop1.nModified){
				            			console.log('[Update bookProp]update bookprop count Successfull');
				            			// console.log(bookprop1);
										res.json({
											'errType': 0
										});
				            		}else{
				            			console.log('[Update bookProp] No update for bookprop');
										res.json({
											'errType': 3
										});
				            		}
				            	});
				            }else{
				            	var newBookProp = {
				            		isbn: param.isbn,
									name: param.name,
									desc: param.desc,
									publisher: param.publisher,
									author: param.author,
									pageCount: param.pageCount,
									price: param.price,
									count: 1,
									// image: 
				            	};
				            	BookProp.create(newBookProp, function(err, newBookProp){
				            		if(err){
				            			console.log('[Add a bookProp]Insert bookprop err : '+ err);
										res.json({
											'errType': 3
										});
				            		}
				            		else if(newBookProp){
				            			console.log('[Add a bookProp]Insert bookprop Successfull');
				            			res.json({
											'errType': 0
										});
				            		}else{
				            			console.log('[Add a bookProp]Insert bookprop Fail');
				            			res.json({
											'errType': 3
										});
				            		}

				            	});
				            }
		            	});
		            }

	        	});
	        }

		});


	});// add one book

	app.delete('/admin/book/:unqId', function(req, res){
		console.log(req.params);
		var delunqID = req.params.unqId;
		Book.findOne({
			unqId : delunqID
		}, function(err, book){
			if(err) {
	          console.log('[Delete a book]DB find a book err : '+ err);
	          res.json({
	            'errType': 3
	          });
	        }
	        else if(!book){
				console.log('[Delete a book]No this book');
				res.json({
				'errType': 1
				});
	        }else{
	        	Book.update({unqId: delunqID},{isDeleted: 1}, function(err, delbook){
	        		if(err) {
			          console.log('[Delete a book]delete a book error : '+ err);
			          res.json({
			            'errType': 3
			          });
			        }
            		else if(delbook.nModified){
	        			BookProp.findOne({isbn: book.isbn}, function(err, bookprop2){
	        				if(err) {
					          console.log('[Delete a book]search bookprop2 error : '+ err);
					        }else{
					        	BookProp.update({isbn: bookprop2.isbn},{count: bookprop2.count-1}, function(err, bookprop3){
			        				if(err) {
							          console.log('[Delete a book]update book count error : '+ err);
							          res.json({
							            'errType': 3
							          });
							        }
							        else if(bookprop3.nModified){
							        	console.log('[Delete a book]delete a book Successfull');
										res.json({
											'errType': 0
										});
							        }else{
							        	console.log('[Delete a book]update book count Fail');
										res.json({
											'errType': 3
										});
							        }
		        				});
					        }
	        			});
            		}else{
            			console.log('[Delete a book] delete book Fail');
						res.json({
							'errType': 3
						});
            		}
	        	});
	        }
	    });
	});// delete one book

	app.put('/admin/book/unqId', function(req, res){
		// console.log(req.params.unqId);
		var param = req.body;
		var mdfBook = {
			name: param.name,
			image: param.image,
			author: param.author,
			publisher: param.publisher,
			pageCount: param.pageCount,
			price: param.price,
			desc: param.desc
		}

		BookProp.update({isbn: param.isbn},mdfBook, function(err, bookprop4){
			if(err) {
	          console.log('[update book info]update book info err : '+ err);
	          res.json({
	            'errType': 3
	          });
	        }
	        else if(bookprop4.nModified){
				console.log(bookprop4.nModified);
				console.log('[update book info]update book Successfull');
				res.json({
				'errType': 0
				});
	        }else{
	        	console.log('[update book info]update book Fail');
				res.json({
				'errType': 3
				});
	        }
		});


	});

};