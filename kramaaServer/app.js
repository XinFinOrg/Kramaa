var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/api/users', require('./userOnboarding/routes'));
app.use('/api/dashboard', require('./userDashboard/routes'));
app.use('/api/projects', require('./projectHandler/routes'));
app.use('/api/devices', require('./deviceHandler/routes'));

app.use(express.static(path.resolve(__dirname, '..','dist')));
app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, '..', 'dist/index.html'));
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

var db = require('./database/models/index');
db.sequelize.sync({ force: false}).then(() => {
  console.log("Sync done");
});

module.exports = app;
