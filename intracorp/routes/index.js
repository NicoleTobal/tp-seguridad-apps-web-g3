var express = require('express');
var router = express.Router();
const {login} = require("../security/Auth")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', function (req, res) {
  login(req.body.username, req.body.password, function (err, data) {
     console.log("Usuario logueado: " + req.body.username)
    if (!data) return res.status(err.errCode).send(err.errMessage);
    res.status(200).send(data);
  });
});

module.exports = router;
