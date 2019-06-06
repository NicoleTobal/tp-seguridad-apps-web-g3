var mongoose = require('mongoose');
var sha256 = require('sha256');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String
})

userSchema.pre('save', function (next) {
    var user = this;
    user.password = sha256(user.password);
    next();
}, function (err) {
    next(err)
})
userSchema.methods.comparePassword = function(candidatePassword, next){
  if(this.password == sha256(candidatePassword)){
    next(null,true);
  } else {
    return next(Error ('Contraseña incorrecta.'));
  }
}

module.exports = mongoose.model("User", userSchema);
