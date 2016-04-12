var BookShelf = require('bookshelf');
var path = require('path');
var connectionString = require('./connectionString.js');


var db = Bookshelf.initialize({
  client: 'postgresql',
  connection: {
    filename: connectionString,
    charset: 'utf8'
  }
});



db.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function(user) {
      user.increments('id').primary();
      user.string('username', 20);
      user.string('password', 100);
      user.timestamps();
    }).then(function(table) {
      console.log('Table created! ', table);
    });
  }
});




module.exports = db;
