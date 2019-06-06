const userRepository = require('../models/userRepository');
var jwt = require('jsonwebtoken');

const secret = 'superSecreto';
const authHeader = 'x-access-token';

const verifyAuthHeader = (headers, res, next) => {
  var token = headers[authHeader]
  if (!token) {
    return res.status(401).send({ auth: false, message: 'Debe proveer un token en el header "' + authHeader + '"' });
  } else {
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        return res.status(500).send({ auth: false, message: 'Token inválido.' });
      } else {
        let user;
        userRepository.findUserByUsernameInDB(decoded ? decoded.username : '').then(user => {
          if (!user) {
            return res.status(404).send("Usuario no encontrado.");
          } else {
            next();
          }
        });
      }
    });
  }
}

const login = (username, password, callback) => {
  userRepository.findUserByUsernameInDB(username).then(user => {
    if (!user) {
      return callback({errCode: 404, errMessage: 'Usuario no encontrado.'});
    }
    const passwordIsValid = password === user.password;
    if (!passwordIsValid) return callback({errCode: 401, errMessage: { auth: false, token: null }});
    const token = jwt.sign({ id: user._id, username: user.username }, secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    callback({}, { auth: true, token: token })
  });
}

module.exports = {
  login,
  verifyAuthHeader
}