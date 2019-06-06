var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();

mongoose.connect('mongodb://localhost:27017/intracorp', { useNewUrlParser: true });

// mongoose.deleteModel('User');

const Schema = mongoose.Schema;

const User = mongoose.model('User', new mongoose.Schema({
    username: String,
    password: String,
    email: String
}));

const initialize = function(){
  User.remove({}, () => {
    User.create([
      {username: 'laureano', password: 'lau1234', email: "laureano.clausi@gmail.com"},
      {username: 'nicole', password: 'nic1234', email: "nickytobal@gmail.com"},
      {username: 'macha', password: 'mac1234', email: "barrimmachado@gmail.com"},
      {username: 'admin', password: 'admin', email: "admin@admin.com"}
   ], function(err, doc) {
      if (err) return next(err);
      console.log(doc);
    });
  });
}

module.exports = {init: initialize,
                  User: User}
