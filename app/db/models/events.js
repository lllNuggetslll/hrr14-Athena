var Bookshelf = require('../database');
require('./user');

var Event = Bookshelf.Model.extend({
  tableName: 'events',

  user: function() {
    return this.belongsTo('User');
  }

});

module.exports = Bookshelf.model('Event', Event);
