// add funtions for handling event routes
var Event = require('../models/events');
var User = require('../models/user');
var jwt = require('jwt-simple');
var knex = require('knex');
var Bookshelf = require('bookshelf').mysqlAuth;


module.exports = {

  getLocal: function(req, res, next) {
    console.log('in')
    var raw = "select * from events where st_within(location_point, st_buffer(st_point(127,37), 50))";
    //var point = req.params.location_point;
    var point = (37, 127);
    //expecting (lat,long)
    //var q = '(37,127)(circle + " " + \'((37,127),50)\')'
    new Event()
    // .query( 'where', 'location_point', '<@',  q )
    //.query( 'where', 'location_point', '<@', "point(circle '((0,0),2)')" )
    //.query( knex.raw("SELECT * FROM events WHERE location_point <@ circle'((37,127),50)'"))
    // .query(function() {
    //   var raw = "SELECT * FROM events WHERE location_point <@ circle'((37,127),50)'";
    //   Bookshelf.knex.raw(raw)
    // })
    .query(knex.raw(raw))
    //knex.raw(raw)
    //Bookshelf.knex.raw(raw)
      //.fetch()
      .then(function(events) {
        res.status(201).send(events);
      }).catch(function(err) {
        res.status(404).send(err);
      });
  },

  addEvent: function(req, res, next) {
    //the way it is set up now, we need to get username from token
    //or header, then query db and get user id for foreign key.
    //perhaps our foreign key should be users.username instead?
    //see config.js line 44
    console.log(req.body)
      // date and time need to get lumped together
      // process date and time
    var date = req.body.date.split('T')[0];
    var time = req.body.time.split('T')[1];
    var point = 'st_setsrid(st_point' + req.body.location_point + ', 4326)';

    new User({ id: req.user.id }).fetch().then(function(user) {
      return user.events().create({
        time: date + ' ' + time,
        type_of_meet: req.body.type_of_meet,
        song_title: req.body.song_title,
        as_sung_by: req.body.as_sung_by,
        location_point: req.body.location_point
      });
    })
    .then(function(event) {
      console.log('saved event');
      // res.status(201);
      res.status(201).send(event);
    });
  },

  getOneEvent: function(req, res, next) {

    new Event({ id: req.params.eventId }).fetch({
      withRelated: ['user']
    }).then(function(event) {
      if (event) {
        res.status(200).send(event);
      } else {
        res.status(404).send('event not found');
      }
    });

  },

  // THIS NEEDS TO GET BUILT OUT
  getEvents: function(req, res, next) {
    new Event()
      .fetchAll({
        withRelated: ['user']
      })
      .then(function(events) {
        res.status(200).send(events);
      }).catch(function(err) {
        console.log(err);
        res.status(404).send('event not found');
      });
  }

};
