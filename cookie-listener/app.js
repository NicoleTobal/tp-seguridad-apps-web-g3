var createError = require('http-errors');
var cookieParser = require('cookie-parser');
const express = require('express');
var app = express();
const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.post('/damecookie', function (req, res) {
    var jsonCookies = JSON.stringify(req.cookies);
    console.log("Origin " + req.socket.remoteAddress + "[" + new Date() + "] " + jsonCookies);
    res.status(201).send();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
