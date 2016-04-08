angular.module('karaoke.addevent', [])

.controller('addEventCtrl', function($scope, $state) {

  $scope.event = {};

  $scope.addEvent = function(isValid) {
    if (isValid) {
      console.log($scope.event);
      // redirect to the new event
      // UPDATE THIS to only redirect once the event creation has gone through?
      $state.go('event', {eventID : $scope.event.title});
    }
  };

});