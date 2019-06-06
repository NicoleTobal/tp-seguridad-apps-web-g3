var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const express = require('express');
const restify = require('express-restify-mongoose');
const bodyParser = require('body-parser');
const {User} = require("./models/DB");
const {init} = require('./models/DB');

var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
const router = express.Router();
var {verifyAuthHeader} = require('./security/Auth');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use((req, res, next) => {
  if (req.originalUrl.includes('/apis')) {
    verifyAuthHeader(req.headers['x-access-token'], res, next);
  } else {
    next();
  }
});


init();

restify.serve(router, User, {
    private: ['password'],
});

app.use(router);

app.use('/', indexRouter);
//app.use('/api/users', usersRouter);

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
