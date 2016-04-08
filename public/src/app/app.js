// MAIN ANGULAR APP MODULE
// include modules dependencies for the entire app
// include config and routing (ui-router)
angular.module('karaoke', [
  'karaoke.services',
  'karaoke.nav',
  'karaoke.home',
  'karaoke.auth',
  'ui.router'
])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'src/app/components/home/home.html',
      controller: 'homeCtrl'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'src/app/components/auth/signup.html',
      controller: 'authCtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'src/app/components/auth/login.html',
      controller: 'authCtrl'
    });
});