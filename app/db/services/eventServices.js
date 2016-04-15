var Event = require('../models/events');
var User = require('../models/user');
var knex = require('knex');
var jwt = require('jwt-simple');

module.exports = {
  addEvent: function(req, res, next) {
    var date = req.body.date.split('T')[0];
    var time = req.body.time.split('T')[1];

    new User({ id: req.user.id }).fetch().then(function(user) {
        console.log(req.body.location_point);
        return user.events().create({
          time: date + ' ' + time,
          type_of_meet: req.body.type_of_meet,
          song_title: req.body.song_title,
          as_sung_by: req.body.as_sung_by,
          lat: req.body.location.lat,
          long: req.body.location.long,
          location_point: 'POINT(' + req.body.location.lat + ' ' + req.body.location.long + ')'
        });
      })
      .then(function(event) {
        console.log('saved event');
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
  },

  getProximalEvents: function(req, res, next) {
    new Event()
      .where(knex.raw("ST_DWithin(location_point, ST_GeomFromText('POINT(" + req.params.lat + " " + req.params.long + ")'), " + req.params.proximity + ")"))
      .fetchAll()
      .then(function(eventsObj) {
        var events = [];
        if (eventsObj.models.length) {
          events = eventsObj.models.map(function(evt) {
            return evt.attributes;
          });
        }
        res.status(200).send(events);
      })
      .catch(function(err) {
        console.log(err);
        res.status(404).send('error');
      });
  }
};
