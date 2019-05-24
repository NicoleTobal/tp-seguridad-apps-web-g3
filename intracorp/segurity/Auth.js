const { findUserByIdInDB, findUserByUsernameInDB } = require('../models/userModel');
var jwt = require('jsonwebtoken');

const secret = 'superSecreto';

const verifyAuthHeader = (token, res, next) => {
  if (!token) {
    return res.status(401).send({ auth: false, message: 'No token provided.' });
  } else {
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      } else {
        const user = findUserByIdInDB(decoded ? decoded.id : '');
        if (!user) {
          return res.status(404).send("No user found.");
        } else {
          next();
        }
      }
    });
  }
}

const login = (username, password, callback) => {
  findUserByUsernameInDB(username).then((user) => {
    if (!user) {
      return callback({errCode: 404, errMessage: 'No user found.'});
    }
    const passwordIsValid = password === user.password;
    if (!passwordIsValid) return callback({errCode: 401, errMessage: { auth: false, token: null }});
    const token = jwt.sign({ id: user._id }, secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    callback({}, { auth: true, token: token })
  });
}

module.exports = {
  login,
  verifyAuthHeader
}