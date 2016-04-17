angular.module('karaoke.addevent', [])

.controller('addEventCtrl', function($scope, $state, $rootScope, eventFactory, locationFactory) {
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
      rendermap($scope.lat, $scope.long);
      $scope.loading = false;
    });
  } else {
    $scope.lat = $rootScope.userLocation.latitude;
    $scope.long = $rootScope.userLocation.longitude;
    rendermap($scope.lat, $scope.long);
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

  function rendermap(lat, long) {
    var map = L.map('create-event_map').setView([lat, long], 15);
    L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
      attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      subdomains: 'abcd',
      minZoom: 0,
      maxZoom: 20,
      ext: 'png'
    }).addTo(map);
    map.on('click', mapClickHandler.bind(map));
  }

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