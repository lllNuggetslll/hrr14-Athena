var db = require('../config.js');

var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
>>>>>>> 50797e21f620584295346aad8f17f5def49bb395

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,


  comparePassword: function (attemptedPassword, callback) {
    bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
      callback(isMatch);
    });
  },


  initialize: function() {
    var self = this;
    this.on('creating', function() {

      //do stuff with password things



    });


  }

});

      var password = this.get('password');
      return new Promise(function (resolve, reject) {
        bcrypt.hash(password, null, null, function (err, hash) {
          if (err) {
            reject(err);
          } else {
            self.set('password', hash);
            resolve(hash);
            console.log('init', self.get('password'));
          }
        });
      });
    });

  },

});

module.exports = User;

