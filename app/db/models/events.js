var db = require('../config.js');
var Bookshelf = require('bookshelf')(db);
var path = require('path');
var User = require('./user.js');

var Event = Bookshelf.Model.extend({
  tableName: 'events',

  user: function() {
    return this.belongsTo(User);
  }

});

module.exports = Event;
