const mongoose = require('mongoose');
const User = require("./User.model");

mongoose.connect('mongodb://mongo:27017/intracorp', { useNewUrlParser: true });

const initialize = function(){
  User.remove({}, () => {
    User.create([
      {username: 'lclausi', password: 'lau1234', email: "lclausi@atlantis.com"},
      {username: 'ntobal', password: 'nic1234', email: "ntobal@atlantis.com"},
      {username: 'rmachado', password: 'mac1234', email: "rmachado@atlantis.com"},
      {username: 'admin', password: 'admin', email: "admin@atlantis.com"}
   ], function(err, doc) {
      if (err) return next(err);
      console.log(doc);
    });
  });
}

module.exports = {init: initialize}
