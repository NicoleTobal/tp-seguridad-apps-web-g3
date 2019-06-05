var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();

mongoose.connect('mongodb://localhost:27017/database', { useNewUrlParser: true });

// mongoose.deleteModel('User');

const Schema = mongoose.Schema;

const mySchema = Schema({username: String, password: String, email: String});
const usermodel = mongoose.model('User', mySchema);



const initialize = function(){
  usermodel.remove({}, () => {
    usermodel.create([{username: 'laureano', password: '1234', email: "laureano.clausi@gmail.com"},
    {username: 'nicole', password: '1234', email: "nickytobal@gmail.com"},
    {username: 'macha', password: '1234', email: "barrimmachado@gmail.com"},
    {username: 'admin', password: 'admin', email: "admin@admin.com"}], function(err, doc) {
      if (err) return next(err);
      console.log(doc);
    });
  });
}

module.exports = {init: initialize,
                  usermodel: usermodel}