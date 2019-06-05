const { usermodel } = require("./DB");

const findUserByIdInDB = function (id){
  return new Promise((resolve, reject) =>
   usermodel.findById(id).exec((err, res) => {
    if (err) reject (err);
    resolve(res);
  }));
}

const findUserByUsernameInDB = function (username){
  return new Promise((resolve, reject) =>
    usermodel.findOne({username}).exec((err, res) => {
      if (err) reject (err);
      resolve(res);
    }));
}

module.exports={findUserByIdInDB,
  findUserByUsernameInDB};