angular.module('karaoke.services')

.factory('locationFactory', function($q, $window) {
  var getPosition = function() {
    var deferred = $q.defer();

    if (!$window.navigator.geolocation) {
      deferred.reject('geolocation not supported');
    } else {
      $window.navigator.geolocation.getCurrentPosition(
        function(pos) {
          deferred.resolve(pos);
        },
        function(err) {
          deferred.reject(err);
        });
    }

    return deferred.promise;
  };

  return {
    getPosition : getPosition
  };
});