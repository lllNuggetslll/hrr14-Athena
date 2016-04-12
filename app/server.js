var express = require('express');
var morgan = require('morgan');
var parser = require('body-parser');
var services = require('./services.js');

var app = express();

var userService = require('./db/services/userServices.js');
var eventService = require('./db/services/userServices.js');

//modularize to middleware page? probably not necessary...
app.use(morgan('dev'));
app.use(parser.json());
app.use(express.static(__dirname + '/../public'));






//modularized routes to routes.js page. too late to stop me.
require('./routes.js')(app, express);



module.exports = app;
