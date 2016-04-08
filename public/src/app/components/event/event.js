angular.module('karaoke.event', [])

.controller('eventCtrl', function($scope, $stateParams) {

  $scope.id = $stateParams.eventID;

});