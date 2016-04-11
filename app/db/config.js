var BookShelf = require('bookshelf');



var db = Bookshelf.initialize({
  client: 'postgresql',
  connection: {
    host: 'localhost',
    port: ''
    user: 'root',
    password: '',
    database: 'MapDB',
    charset: 'utf8',
  }
});
