angular.module('karaoke.auth', [])

.controller('authCtrl', function($scope, $window, $location, authFactory) {

  $scope.user = {};

  $scope.signup = function(isValid) {
    if (isValid) {
      authFactory.signup($scope.user)
        .then(function (token) {
          $window.localStorage.setItem('com.karaoke', token);
          //direct to where upon signup? 
          $location.path('/addEvent');
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };

  $scope.login = function(isValid) {
    if (isValid) {
      Auth.signin($scope.user)
        .then(function (token) {
          $window.localStorage.setItem('com.karaoke', token);
          //direct to where upon login? 
          $location.path('/addEvent');
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };

});