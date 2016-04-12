angular.module('karaoke.nav', [])

.controller('navCtrl', function($scope, authFactory) {
  $scope.droppedDown = false;

  $scope.toggleClass = function() {
    $scope.droppedDown = !$scope.droppedDown;
  };

  $scope.logOut = function() {
  	authFactory.logout();
  };

  $scope.$on('$locationChangeStart', function(next, current) {
    $scope.droppedDown = false;
  });
});