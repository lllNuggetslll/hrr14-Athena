angular.module('karaoke.addevent', [])

.controller('addEventCtrl', function($scope, $state, $rootScope, eventFactory, locationFactory, mapService) {
  $scope.lat = '';
  $scope.long = '';
  $scope.event = {};
  $scope.event.location = {};
  $scope.marker = null;
  $scope.loading = true;
  $scope.loadingMessage = 'establishing user location';

  if (!$rootScope.userLocation) {
    locationFactory.getPosition()
    .then(function(pos) {
      $rootScope.userLocation = pos.coords;
      $scope.lat = pos.coords.latitude;
      $scope.long = pos.coords.longitude;
      mapService.renderMap($scope, $scope.lat, $scope.long, 15, 0, 20, 'create-event_map');
      $scope.map.on('click', mapClickHandler.bind($scope.map));
      $scope.loading = false;
    });
  } else {
    $scope.lat = $rootScope.userLocation.latitude;
    $scope.long = $rootScope.userLocation.longitude;
    mapService.renderMap($scope, $scope.lat, $scope.long, 15, 0, 20, 'create-event_map');
    $scope.map.on('click', mapClickHandler.bind($scope.map));
    $scope.loading = false;
  }

  $scope.addEvent = function(isValid) {
    if (isValid && $scope.marker) {
      eventFactory.addEvent($scope.event)
      .then(function(response) {
        // redirect to the new event's detail page once it has gone through
        $state.go('event', { eventID : response.id });
      });
    }
  };

  function mapClickHandler(e) {
    var coords = e.latlng;
    var micIcon = L.icon({
      iconUrl: 'src/assets/images/mic.svg',
      iconSize: [26, 26],
      iconAnchor: [13, 13]
    });
    // if a marker has been placed previously, remove it
    if ($scope.marker) {
      this.removeLayer($scope.marker);
    }
    $scope.marker = L.marker([coords.lat, coords.lng], { icon: micIcon });
    // add the coords used for the marker to the event object
    $scope.event.location = { lat : coords.lat, long : coords.lng };
    $scope.marker.addTo(this);
  }
});