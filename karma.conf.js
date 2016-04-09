module.exports = function(config) {
  config.set({

    basePath: './',

    frameworks: ['mocha', 'chai', 'sinon'],

    files: [
      // source files
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',

      // app code
      'public/src/app/services/mapFactory.js',
      'public/src/app/services/locationFactory.js',
      'public/src/app/services/authFactory.js',
      'public/src/app/components/navigation/nav.js',
      'public/src/app/components/home/home.js',
      'public/src/app/components/event/event.js',
      'public/src/app/components/auth/auth.js',
      'public/src/app/components/addEvent/addevent.js',
      'public/src/app/app.js',

      // ADD SPEC FILES HERE
      'tests/client/stateSpec.js',
      'tests/client/locationFactorySpec.js',
      'tests/client/navCtrlSpec.js',
      'tests/client/authCtrlSpec.js'
    ],

    reporters: ['nyan', 'unicorn'],

    browsers: ['Chrome'],

    autoWatch: false,

    singleRun: true

  });
}