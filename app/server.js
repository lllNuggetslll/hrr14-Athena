var express = require('express');
var morgan = require('morgan');
var parser = require('body-parser');

var app = express();

var userService = require('./db/services/userServices.js');
var eventService = require('./db/services/userServices.js');

app.use(morgan('dev'));
app.use(parser.json());
app.use(express.static(__dirname + '/../public'));

require('./routes.js')(app, express);

module.exports = app;
