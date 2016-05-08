var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var app = express();

var errMes=require('./routes/errorMessages');
var er=errMes('en');

//Conexion a la BBDD
require('./lib/connectMongoose');

//Modelos
require('./models/Anuncio');
require('./models/Usuario');
require('./models/Token');




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Middleware del token push
app.use('/',require('./routes/pushTokensMid'));

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

//rutas del api
app.use('/api/v1/anuncios', require('./routes/api/v1/anuncios'));
app.use('/api/v1/usuarios', require('./routes/api/v1/usuarios'));
app.use('/api/v1/pushTokens', require('./routes/api/v1/pushTokens'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
