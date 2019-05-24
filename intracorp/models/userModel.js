const mongoose = require('mongoose');
const { usermodel } = require("./DB");

const findUserByIdInDB = function (id){
  return new Promise((resolve, reject) =>
   usermodel.findById(id).exec(resolve));
}

const findUserByUsernameInDB = function (username){
  return new Promise((resolve, reject) =>
    usermodel.findOne({username}).exec(resolve));
}

module.exports={findUserByIdInDB,
  findUserByUsernameInDB};