var express = require('express');
var router = express.Router();
const {
  usermodel
} = require("../models/DB");

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//
//   if(req.query.password === 'distinct'){
//     usermodel.find(function(err, docs) {
//       if (err) return next(err);
//       res.send(docs);
//     });
//
//   } else {
//     usermodel.find(function(err, docs) {
//       if (err) return next(err);
//       res.send(docs.map(user => user.username));
//     });
//   }
//
// });

module.exports = router;
