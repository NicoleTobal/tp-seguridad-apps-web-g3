var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const express = require('express');
const restify = require('express-restify-mongoose');
const User = require("./models/User.model");
const DB = require('./models/DB');
const router = express.Router();
var viewRoutes = require('./routes/viewRoutes');
var apiRoutes = require('./routes/apiRoutes');
var Auth = require('./security/Auth');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  if (req.originalUrl.includes('/api/v1')) {
    Auth.verifyAuthHeader(req.headers, res, next);
  } else {
    next();
  }
});

DB.init();

//restify
restify.serve(router, User, {
    private: ['password'],
});
app.use(router);

//views
app.use('/', viewRoutes);
app.use('/api', apiRoutes);

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
