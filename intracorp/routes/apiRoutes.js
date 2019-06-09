var express = require('express');
var router = express.Router();
const auth = require("../security/Auth")

router.post('/login', function (req, res) {
  auth.login(req.body.username, req.body.password, function (err, data) {
    console.log("Usuario logueado: " + JSON.stringify(req.body))
    if (!data)  return res.status(500).send(err.errMessage);
    return res.status(200).send(data);
  });
});

router.post('/recuperar-password', function (req, res) {
  auth.recuperar(req.body.email, function (err, isDone) {
    console.log("Usuario recupera passw: " + req.body.email)
    if (isDone) {
      res.status(204).send();
    } else {
      res.status(400).send();
    }
  });
});

module.exports = router;
