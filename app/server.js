var express = require('express');
var morgan = require('morgan');
var parser = require('body-parser');

var app = express();

app.use(morgan('dev'));
app.use(parser.json());
app.use(express.static(__dirname + '/../public'));


module.exports = app;
