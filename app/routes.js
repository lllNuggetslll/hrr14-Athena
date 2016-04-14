var userService = require('./db/services/userServices');
var eventService = require('./db/services/eventServices');
var helpers = require('./helpers');

module.exports = function(app, express) {
  app.post('/api/users/login', userService.login);
  app.post('/api/users/signup', userService.signup);

  app.get('/api/event', eventService.getEvents);
  app.get('/api/event/:eventId', eventService.getOneEvent);
  app.get('/api/proximal/events/:lat/:long/:proximity', eventService.getProximalEvents);

  app.use(helpers.decode);
  app.post('/api/event', eventService.addEvent);

  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);
};
