module.exports = function(config) {
  config.set({

    basePath: './',

    frameworks: ['mocha', 'chai-spies', 'chai', 'sinon'],

    files: [
      // source files
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-animate/angular-animate.min.js',
      'bower_components/leaflet/dist/leaflet.js',
      'bower_components/velocity/velocity.min.js',

      // app code
      'public/src/app/services/authFactory.js',
      'public/src/app/services/locationFactory.js',
      'public/src/app/services/eventFactory.js',
      'public/src/app/services/burgerService.js',
      'public/src/app/services/mapService.js',
      'public/src/app/directives/loader/loader.js',
      'public/src/app/components/navigation/nav.js',
      'public/src/app/components/home/home.js',
      'public/src/app/components/auth/auth.js',
      'public/src/app/components/addevent/addevent.js',
      'public/src/app/components/event/event.js',
      'public/src/app/components/allevents/allevents.js',
      'public/src/app/app.js',

      // ADD SPEC FILES HERE
      'tests/client/stateSpec.js',
      'tests/client/controllers/navCtrlSpec.js',
      'tests/client/controllers/homeCtrlSpec.js',
      'tests/client/controllers/authCtrlSpec.js',
      'tests/client/services/locationFactorySpec.js'
    ],

    reporters: ['nyan', 'unicorn'],

    browsers: ['Chrome'],

    autoWatch: false,

    singleRun: true

  });
}