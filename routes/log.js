var Log = require('../models/log.js');

module.exports = function(app) {
  app.get('/admin/logs', function(req, res) {
    console.log('/admin/logs Start!');
    Log.find({}, function(err, logs) {
      if (err) {
        console.log('/admin/logs', err);
        res.status(500).send(err);
      } else {
        res.send(logs);
      };
    });
  });
}
