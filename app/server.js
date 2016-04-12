var express = require('express');
var morgan = require('morgan');
var parser = require('body-parser');
var services = require('./services.js');

var app = express();

app.use(morgan('dev'));
app.use(parser.json());
app.use(express.static(__dirname + '/../public'));

app.get('user/local', services.getLocal);
app.post('user/event', services.postEvent);






module.exports = app;
