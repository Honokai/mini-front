var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
const api = require('./routes/testApi');
const autenticacao = require('./routes/autentica');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const cors = require('cors');
const session = require('express-session');
const flash = require('connect-flash');

var app = express();

app.use(session({
	secret:'happy dog',
	saveUninitialized: true,
	resave: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors())
app.use(logger('dev'));
app.use(flash())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/autenticacao', autenticacao);
app.use('/api', api);
app.use('/', indexRouter);
app.use('/usuarios', usersRouter);

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
