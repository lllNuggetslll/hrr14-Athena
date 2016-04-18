angular.module('karaoke.auth', [])

.controller('authCtrl', function($scope, $window, $location, authFactory) {
  $scope.user = {};

  $scope.signup = function(isValid) {
    if (isValid) {
      authFactory.signup($scope.user)
        .then(function (token) {
          $window.localStorage.setItem('com.karaoke', token);
          // redirect to addEvent on signup
          $location.path('/addEvent').replace();
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };

  $scope.login = function(isValid) {
    if (isValid) {
      authFactory.login($scope.user)
        .then(function (token) {
          $window.localStorage.setItem('com.karaoke', token);
          // redirect to addEvent upon login
          $location.path('/addEvent').replace();
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };
});
