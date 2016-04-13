var userService = require('./db/services/userServices.js');
var eventService = require('./db/services/eventServices.js');
var helpers = require('./helpers.js');

module.exports = function (app, express) {
  app.post('/api/users/login', userService.login);
  app.post('/api/users/signup', userService.signup);

  app.get('user/local', eventService.getLocal);
  // app.post('user/event', eventService.postEvent);

  //user helper for decoding token if route is addEvent
  app.use(helpers.decode);

  app.route('api/addEvent') //not sure what this api is yet
  app.post('api/addEvent', eventService.addEvent); //define function in eventServices.js
     //define function in eventServices.js

  // handles errors for routes not handled above
  // or could we route to a default page like map view?
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);
};
