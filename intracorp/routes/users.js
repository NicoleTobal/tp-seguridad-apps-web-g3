var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();

mongoose.connect('mongodb://localhost:27017/database', { useNewUrlParser: true });

// mongoose.deleteModel('User');

const Schema = mongoose.Schema;

const mySchema = Schema({username: String, password: String});
const usermodel = mongoose.model('User', mySchema);

usermodel.remove({}, () => {
  usermodel.create([{username: 'laureano ', password: '1234'},
  {username: 'nicole', password: '1234'},
  {username: 'macha', password: '1234'},
  {username: 'admin', password: 'admin'}], function(err, doc) {
    if (err) return next(err);
    console.log(doc);
  });
});

// 

/* GET users listing. */
router.get('/', function(req, res, next) {

if(req.query.password === 'distinct'){
  usermodel.find(function(err, docs) {
    if (err) return next(err);
    res.send(docs);
  });

} else {
  usermodel.find(function(err, docs) {
    if (err) return next(err);
    res.send(docs.map(user => user.username));
  });
}

});

module.exports = router;
