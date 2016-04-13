angular.module('karaoke.services')

.factory('eventFactory', function($http) {
  var addEvent = function(event) {
    return $http({
      method: 'POST',
      url: '/api/event',
      data: event
    })
    .then(function(response) {
      return response.data;
    });
  };

  return {
    addEvent : addEvent
  };
});