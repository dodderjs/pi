var configs = require('./configs');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var dust = require('express-dustjs');

var app = express();

// view engine setup
app.engine('dust', dust.engine({
  // Use dustjs-helpers 
  useHelpers: true
}))
app.set('view engine', 'dust')
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});

var server = app.listen(configs.port, 'localhost', function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Start server on: ', host + ':' + port);
});