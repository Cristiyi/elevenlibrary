var User = require('../models/User.js');
var jwt = require('jsonwebtoken');
/*
 * GET users listing.
 */

// exports.list = function(req, res){
//   res.send("respond with a resource");
// };

module.exports = function(app) {

app.post('/adminLogin', function(req, res){
    var intrID = req.body.intrID;
    var pwd = req.body.pwd;
    if(intrID && pwd){
      if('libadmin@cn.ibm.com' == intrID){
        if('libadmin' == pwd){
          console.log('[AdminLogin]Login Successfully');
          res.json({
            'errType': 0
          });
        }else{
          console.log('[AdminLogin]Wrong Password');
          res.json({
            'errType': 2
          });
        }
      }else{
        console.log('[AdminLogin]intrID incorrect');
        res.json({
          'errType': 1
        });
      }
    }else{
      console.log('[AdminLogin]intrID or pwd is null');
    }
  });
  

  app.post('/login', function(req, res) {
    User.findOne({
      'intrID': req.body.intrID
    }, function(err, user) {
      if(err) {
        console.log('[Login]DB err : '+ err);
        res.json({
          'errType': 3
        });
      }
      if(user){
        if(user.pwd == req.body.pwd){
          console.log('[Login]Successfully'+ user);
          var profile = {
            intrID : user.intrID,
            pwd: user.pwd
          };
          var token = jwt.sign(profile, 'elevenlibrary', { expiresInMinutes: 1 });
          res.json({
            'errType': 0,
            'token': token
          });
        }else{
          console.log('[Login]Wrong Password');
          console.log("db_pwd =" + user.pwd + "   pwd =" + req.body.pwd);
          res.json({
            'errType': 2
          });
        }
      }else{
        console.log('[Login]No User found');
        res.json({
          'errType': 1
        });
      }
    });
  });

  app.post('/register', function(req, res) {
    var intrID = req.body.intrID;
    if(intrID){
      intrID = intrID.replace(/(^\s+)|(\s+$)/g,'');
    }
    var newUser = {
      'intrID': intrID,
      'name': req.body.name,
      'pwd': req.body.pwd,
      'phoneNum': req.body.phoneNum
    };

    var validateEmail = /^\w+(@cn.ibm.com)$/;
    var validatePwd = /^[A-Za-z0-9]{6,}$/;
    var validatePhone = /^[0-9]{11}$/;

    var validateFail = '';

    if(validateEmail.test(newUser.intrID)){
      // console.log('email pass');
    }else{
      validateFail += "e";
    }
    if(validatePwd.test(newUser.pwd)){
      // console.log('password pass');
    }else{
      validateFail += "w";
    }
    if(newUser.phoneNum){
      if(validatePhone.test(newUser.phoneNum)){
        // console.log('phonenumber pass');
      }else{
        validateFail += "p";
      }
    }

    if(validateFail==''){
      User.findOne({
        'intrID': req.body.intrID
      }, function(err, user) {
        if(err) {
          console.log('[Register]DB find uer err : '+ err);
          res.json({
            'errType': 3
          });
        }
        if(!user){
          User.create(newUser, function(err, newuser) {
            if(err) {
              console.log('[Register]DB insert uer err : '+ err);
              res.json({
                'errType': 3
              });
            }
             console.log('[Register]DB insert newuser' + newuser);
             if(newuser){
              console.log('[Register]Successful');
              res.json({
                'errType': 0,
                'RegUser': newuser
              }); 
             }else{
              console.log('[Register]Failed');
              res.json({
                'errType': 3
              });
             }
          });
        }else{
          console.log('[Register]User existed');
          res.json({
            'errType': 1
          });
        }
      })
    }else{
      console.log('[Register]validateFail');
      res.json({
        'errType': 2
      });
    }
  });
/*************************************************** test */
  app.get('/elib/restricted', function (req, res) {
    console.log('user ' + req.intrID + ' is calling /restricted');
    res.json({
      name: req.intrID
    });
  });


};
