var User = require('../models/User.js');
/*
 * GET users listing.
 */

// exports.list = function(req, res){
//   res.send("respond with a resource");
// };

module.exports = function(app) {
  app.post('/login', function(req, res) {
    User.findOne({
      'intrID': req.body.intrID
    }, function(err, user) {
      if (err || !user) {
        console.log('[Login]No User found');
        res.json({
          'isSucc': false
        });
      } else if (user.pwd !== req.body.pwd) {
        console.log('[Login]Wrong Password');
        console.log("pwd1 =" + user.pwd + "   pwd2 =" + req.body.pwd);
        res.json({
          'isSucc': false
        });
      } else {
        console.log('[Login]Successfully');
        res.json({
          'isSucc': true
        });
      }
    });
  });

  app.post('/register', function(req, res) {
    var newUser = {
      'intrID': req.body.intrID,
      'name': req.body.name,
      'pwd': req.body.pwd
    };
    User.findOne({
      'intrID': req.body.intrID
    }, function(err, user) {
      if (err || !user) {
        User.create(newUser, function(err, user) {
          if (err || !user) {
            console.log('[Register]Failed');
            res.json({
              'isSucc': false
            });
          } else {
            console.log('[Register]Successful');
            console.log(user);
            res.json({
              'isSucc': true
            });
          };
        });
      } else {
        console.log('[Register]User Existed');
        console.log(user);
        res.json({
          'isSucc': false
        });
      }
    })

  });
};
