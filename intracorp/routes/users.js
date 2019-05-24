var express = require('express');
var router = express.Router();
const {
  usermodel
} = require("../models/DB");

const { login} = require("../segurity/Auth")
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

router.post('/login', function (req, res) {
  console.log(req);
  login(req.body.username, req.body.password, function (err, data) {
    if (!data) return res.status(err.errCode).send(err.errMessage);
    res.status(200).send(data);
  });
});

module.exports = router;
