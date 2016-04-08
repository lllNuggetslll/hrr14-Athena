// MAIN ANGULAR APP MODULE
// include modules dependencies for the entire app
// include config and routing (ui-router)
angular.module('karaoke', [
  'karaoke.services',
  'karaoke.nav',
  'karaoke.home',
  'ui.router'
])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'src/app/components/home/home.html',
      controller: 'homeCtrl'
    });
});