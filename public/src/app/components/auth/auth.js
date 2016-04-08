angular.module('karaoke.auth', [])

.controller('authCtrl', function($scope) {

  $scope.user = {};

  $scope.signup = function(isValid) {
    if (isValid) {
      // send user info to server
      // if successful, tell user, start a session. set any info on $rootScope?
      // else, indicate the error (user name already taken, etc.)
      console.log('can submit');
    }
  };

  $scope.login = function(isValid) {
    if (isValid) {
      // send user info to server
      // if successful, start a session
      // else, indicate the error (un does not exist, wrong password, etc.)
      console.log('can submit');
    }
  };

});