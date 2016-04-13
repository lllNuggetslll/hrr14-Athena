var db = require('../config.js');
var Bookshelf = require('bookshelf')(db);
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var events = require('./events.js');

var Events = Bookshelf.Model.extend({
  tableName: 'events',

  user: function(){
    return this.belongsTo(User);
  }

});

module.exports = Events;

