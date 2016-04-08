angular.module('karaoke.nav', [])

.controller('navCtrl', function($scope) {
  $scope.droppedDown = false;
  // var notDroppedDown = true;

  $scope.toggleClass = function() {
    // if (!droppedDown) {
    //   console.log('not dropped down');
    // } else {
    //   console.log('dropped down');
    // }
    $scope.droppedDown = !$scope.droppedDown;
  };

});