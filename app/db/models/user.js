var db = require('../config.js');


var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,


  initialize: function() {
    var self = this;
    this.on('creating', function() {
      //do stuff with password things



    });


  }

});
