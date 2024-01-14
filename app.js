var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// load i18n for internalization:
const i18n = require('./lib/i18nConfigure');

// load middleware:
const jwtAuthMiddleware = require('./lib/jwtAuthMiddleware');

// load the drivers:
const LoginController = require('./controllers/LoginController');

// connect with the DB:
require('./lib/connectMongoose');

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api/products');

var app = express();

// define the name of the app to have access from any file:
app.locals.title = 'Nodepop';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 📌 create an instance of the controller:
const loginController = new LoginController();

/*
 * Api routes:
 */
// JWT middleware:
app.post('/api/authenticate', loginController.postJWT);
app.use('/api/products', jwtAuthMiddleware, apiRouter);

/*
 * Web routes:
 */
// Middleware of the languages ​​to use for each request:
app.use(i18n.init);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // check if it is a validation error
  if (err.array) {
    const errorInfo = err.errors[0];
    console.log(errorInfo);
    err.message = `Error in ${errorInfo.location}, parameter ${errorInfo.path} ${errorInfo.msg}`;
    err.status = 422;
  }

  res.status(err.status || 500);

  // if what has failed is a request to the API
  // respond with an error in JSON format
  if (req.originalUrl.startsWith('/api/')) {
    res.json({ error: err.message });
    return;
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.render('error');
});

module.exports = app;
