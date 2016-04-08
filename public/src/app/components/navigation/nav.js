angular.module('karaoke.nav', [])

.controller('navCtrl', function($scope) {
  $scope.droppedDown = false;

  $scope.toggleClass = function() {
    $scope.droppedDown = !$scope.droppedDown;
  };

  $scope.$on('$locationChangeStart', function(next, current) {
    $scope.droppedDown = false;
  });
});