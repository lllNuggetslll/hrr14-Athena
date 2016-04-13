angular.module('karaoke.event', [])

.controller('eventCtrl', function($scope, $stateParams, eventFactory) {

  $scope.creator = '';
  $scope.song = '';
  $scope.artist = '';
  $scope.date = '';
  $scope.time = '';

  eventFactory.getOne($stateParams.eventID)
  .then(function(response) {
    $scope.creator = response.user.username;
    $scope.song = response.song_title;
    $scope.artist = response.as_sung_by;
    
  });

});