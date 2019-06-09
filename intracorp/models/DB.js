const mongoose = require('mongoose');
const User = require("./User.model");

mongoose.connect('mongodb://192.168.0.12:27017/intracorp', { useNewUrlParser: true });

const initialize = function(){
  User.remove({}, () => {
    User.create([
      {username: 'LClausi', password: 'lau1234', email: "laureano.clausi@atlantis.com"},
      {username: 'NTobal', password: 'nic1234', email: "nickytobal@atlantis.com"},
      {username: 'RMachado', password: 'mac1234', email: "barrimmachado@atlantis.com"},
      {username: 'admin', password: 'admin', email: "admin@atlantis.com"}
   ], function(err, doc) {
      if (err) return next(err);
      console.log(doc);
    });
  });
}

module.exports = {init: initialize}
