const userRepository = require('../models/userRepository');
var jwt = require('jsonwebtoken');

const secret = 'superSecreto';
const authHeader = 'authorization';

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
  userRepository.findUserByUsernameInDB(username).then((user)=>{
    if (!user) {
      return callback({errCode: 404, errMessage: 'Usuario no encontrado.'});
    }
    user.comparePassword(password, (err,isMatch)=>{
        if(isMatch){
          const token = jwt.sign({ id: user._id, username: user.username }, secret, {
            expiresIn: 86400 // expires in 24 hours
          });
          callback({}, { auth: true, token: token })
        } else {
          return callback({errCode: 401, errMessage: "Contraseña Invalida"});
        }
    })
  }).catch((err)=>{
    return callback({errCode: 401, errMessage: "Error" });
  })
}

const recuperar = (email, callback) => {
  userRepository.findUserByEmailInDB(email)
    .then((user)=>{
      if (user) {
        return callback(null, true);
      } else {
        return callback(null, false);
      }
    })
    .catch(callback)
}

module.exports = {
  login,
  verifyAuthHeader,
  recuperar
}
