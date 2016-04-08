angular.module('karaoke.home', [])

.controller('homeCtrl', function($scope, $rootScope, locationFactory, mapFactory) {

  $scope.lat = '';
  $scope.long = '';

  if (!$rootScope.userLocation) {
    locationFactory.getPosition()
    .then(function(pos) {
      $rootScope.userLocation = pos.coords;
      $scope.lat = pos.coords.latitude;
      $scope.long = pos.coords.longitude;
    });
  } else {
    $scope.lat = $rootScope.userLocation.latitude;
    $scope.long = $rootScope.userLocation.longitude;
  }
  
  // make a map

});