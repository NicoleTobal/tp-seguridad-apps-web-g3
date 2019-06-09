var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  let error = "";
  if (req.query.error) error = req.query.error;
  res.render('login', { error });
});

router.get('/home', function(req, res, next) {
  res.render('home', { });
});


router.get('/recuperar-password', function(req, res, next) {
  res.render('recuperar-password', { });
});

module.exports = router;
