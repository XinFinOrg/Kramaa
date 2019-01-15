var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// const multer = require('multer');
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

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, __dirname + '/imageDump')
//   },
//   filename: function (req, file, cb) {
//     console.log("files", file, req.body)
//     cb(null, file.originalname)
//   }
// });

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
db.sequelize.sync({ force: false }).then(() => {
  console.log("Sync done");
});

module.exports = app;
