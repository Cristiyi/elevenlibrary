var User = require('../models/User.js');
var Book = require('../models/Book.js');
var BookProp = require('../models/BookProp.js');

module.exports = function(app) {
	app.get('/admin/events/:unqId', function(req, res){
		var unqId = req.params.unqId;
		var intrID = "1@cn.ibm.com";

		Book.findOne({unqId: unqId}, function(err, resbook){
			if(err){
				console.log('[Borrow a book] Find the reserved book DB err : '+ err);
			}
			else if(getExpireTime(resbook.applyTime, 2) < new Date()){
				console.log('[Borrow a book] The book has expired');
			}else{
				User.findOne({intrID: intrID}, function(err, buser){
					if(err){
						console.log('[User borrowed Books] This user borrowed books DB err : '+ err);
					}else{
						var addborrower = {
							intrID: buser.intrID,
							name: buser.name
						};
						resbook.borrower.push(addborrower);
						var bTime = new Date();
						var rTime = getExpireTime(bTime, 30);
						Book.update({unqId: unqId}, {status: 2, borrowTime: bTime, returnTime: rTime, intrID: intrID, borrower: resbook.borrower}, function(err, bbook){
							if(err){
								console.log('[Borrow a book] Upate book status and time DB err : '+ err);
							}
							else if(!bbook.nModified){
								console.log('[Borrow a book] Upate book status and time Fail');
							}else{
								var borrowbook = {
								unqId: unqId,
								name: resbook.name
								}
								buser.borrowedBooks.push(borrowbook);
								User.update({intrID: intrID}, {borrowedBooks: buser.borrowedBooks}, function(err, addbook){
									if(err){
										console.log('[User borrowed Books] Update user borrowed books DB err : '+ err);
									}else if(addbook.nModified){
										console.log('[User borrowed Books] Update user borrowed books Successful');
									}else{
										console.log('[User borrowed Books] Update user borrowed books Fail');
									}
								});
								console.log('[Borrow a book] Upate book status and time Successful');
								res.json({
									errType: 0
								});
							}
						});
					}
				});
			}
		});
	});//test


	app.put('/book/:isbn/borrow', function(req, res){
		console.log(req.body);
		// var param = req.body;
		var intrID = req.body.intrID;
		User.findOne({intrID: intrID}, function(err, user){
			if(err) {
	          console.log('[Find qualified user] Find user DB err : '+ err);
	        }
			else if(user.borrowedBooks.length > 2){
				res.json({
					errType: 1
				});
			}else{
				Book.findOne({isbn: req.params.isbn, status: 0}, function(err, book){
					if(err) {
			          console.log('[Find available book] Find book DB err : '+ err);
			        }
			        else if(!book){
			        	console.log('[Find available book]No available book');
			        	res.json({
			        		errType: 2
			        	});
			        }else{
			        	Book.update({unqId: book.unqId}, {status: 1, applyTime: new Date()}, function(err, resbook){
			        		if(err) {
					          console.log('[Update book status and time] Update book DB err : '+ err);
					        }
					        else if(!resbook.nModified){
					        	console.log('[Update book status and time] Update book Fail');
					        }else{
					        	console.log('[Update book status and time] Update book Successful');
					        	res.json({
					        		errType: 0
					        	});
					        }
			        	});
			        }
				});
			}
		});

	});//apply one book
	
	app.get('/admin/events', function(req, res){
		var date = new Date();
		date.setDate(date.getDate()-2);
		Book.update({status: 1, applyTime:{$lt: date}}, {status: 0, applyTime: null}, function(err, revbooks){
			if(err){
				console.log('[Reverse applied books] Reverse books DB err : '+ err);
			}
			else if(revbooks.nModified){
				console.log('[Reverse applied books] Some books applyTime has expired and reverse them to free');
			}else{
				console.log('[Reverse applied books] No books expired');
			}
		});
		Book.find({status: 1}, function(err, books){
			if(err){
				console.log('[Find applied books] Find books DB err : '+ err);
			}
			else{
				console.log('[Find applied books] Find all reserved books Successful');
				res.json(books);
			}
		});
	});//apply books list

	app.put('/admin/events/:unqId', function(req, res){
		var unqId = req.params.unqId;
		var intrID = req.body.intrID;

		Book.findOne({unqId: unqId}, function(err, resbook){
			if(err){
				console.log('[Borrow a book] Find the reserved book DB err : '+ err);
			}
			else if(getExpireTime(resbook.applyTime, 2) < new Date()){
				console.log('[Borrow a book] The book has expired');
			}else{
				User.findOne({intrID: intrID}, function(err, buser){
					if(err){
						console.log('[User borrowed Books] This user borrowed books DB err : '+ err);
					}else{
						var addborrower = {
							intrID: buser.intrID,
							name: buser.name
						};
						resbook.borrower.push(addborrower);
						var bTime = new Date();
						var rTime = getExpireTime(bTime, 30);
						Book.update({unqId: unqId}, {status: 2, borrowTime: bTime, returnTime: rTime, intrID: intrID, borrower: resbook.borrower}, function(err, bbook){
							if(err){
								console.log('[Borrow a book] Upate book status and time DB err : '+ err);
							}
							else if(!bbook.nModified){
								console.log('[Borrow a book] Upate book status and time Fail');
							}else{
								var borrowbook = {
								unqId: unqId,
								name: resbook.name
								}
								buser.borrowedBooks.push(borrowbook);
								User.update({intrID: intrID}, {borrowedBooks: buser.borrowedBooks}, function(err, addbook){
									if(err){
										console.log('[User borrowed Books] Update user borrowed books DB err : '+ err);
									}else if(addbook.nModified){
										console.log('[User borrowed Books] Update user borrowed books Successful');
									}else{
										console.log('[User borrowed Books] Update user borrowed books Fail');
									}
								});
								console.log('[Borrow a book] Upate book status and time Successful');
								res.json({
									errType: 0
								});
							}
						});
					}
				});
			}
		});
	});//borrow one book

	app.get('/user/:intrID/borrowedbooks', function(req, res){
		var intrID = req.params.intrID;
		User.findOne({intrID: intrID}, function(err, user){
			res.json({
				books: user.borrowedBooks
			});
		});
	});//I borrowed

	function getExpireTime(now, num){
		// now.setFullYear();
		// now.setDate(now.getDate()+num);
		var expTime = new Date();
		expTime.setDate(now.getDate()+num);
		return expTime;
	}
};
