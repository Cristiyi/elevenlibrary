var settings = require('../settings');
var mongodb = require('mongodb');
var Db = mongodb.Db;
var Connection = mongodb.Connection;
var Server = mongodb.Server;


exports.connection = function() {
	var conn = new Db(settings.db, new Server(settings.host,
settings.port,{auto_reconnect: true}),{safe: true});
	return conn;
};

/*
module.exports = conn;
*/

// exports.index = function(req, res){
// 	conn.open(function(error, db){
// 		if(error) throw error;
// 		db.collection('user',{safe:true},function(error, collection){
// 			if(error) throw error;
// 			collection.find().toArray(function(error,docs){
// 				if(error) throw error;
// 				console.log(docs);
// 				console.log('ok');
// 				conn.close();
// 				res.render('dbquery',{data:docs});
// 			});
// 		});
// 	 });
// };