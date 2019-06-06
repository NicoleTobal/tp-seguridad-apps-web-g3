const User = require("./User.model");

const findUserByIdInDB = function (id){
  return new Promise((resolve, reject) =>
   User.findById(id).exec((err, res) => {
    if (err) reject (err);
    resolve(res);
  }));
}

const findUserByUsernameInDB = function (username){
  return new Promise((resolve, reject) =>
    User.findOne({username}).exec((err, res) => {
      if (err) reject (err);
      resolve(res);
    }));
}

module.exports={findUserByIdInDB,
  findUserByUsernameInDB};
