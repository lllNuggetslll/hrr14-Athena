angular.module('karaoke.home', [])

.controller('homeCtrl', function($scope, $rootScope, locationFactory, eventFactory, mapFactory, $location) {

  $scope.userMap = null;
  $scope.lat = '';
  $scope.long = '';
  $scope.loading = true;
  $scope.loadingMessage = 'loading events in your area';


  if (!$rootScope.userLocation) {
    locationFactory.getPosition()
      .then(function(pos) {
        $rootScope.userLocation = pos.coords;
        $scope.lat = pos.coords.latitude;
        $scope.long = pos.coords.longitude;

        rendermap($scope.lat, $scope.long); //<--render map with user location as center of view
        // third arg passed is proximity, in meters
        queryLocalEvents($scope.lat, $scope.long, 1600);
        $scope.loading = false;
      });
  } else {
    $scope.lat = $rootScope.userLocation.latitude;
    $scope.long = $rootScope.userLocation.longitude;

    // third arg passed is proximity, in meters
    queryLocalEvents($scope.lat, $scope.long, 1600);
    rendermap($scope.lat, $scope.long);
    $scope.loading = false;
  }
  // make a map
  function rendermap(lat, long) {
    $scope.userMap = L.map('map').setView([lat, long], 15); //<-- zoom level, larger is zoomed in
    L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
      attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      subdomains: 'abcd',
      minZoom: 0,
      maxZoom: 20,
      ext: 'png'
    }).addTo(map);
  }

  function queryLocalEvents(lat, long, proximity) {
    eventFactory.getInArea(lat, long, proximity)
      .then(function(events) {
        populateMap(events);
      });
  }

  function populateMap(events) {
    var markers = [];
    var micIcon = L.icon({
      iconUrl: 'src/assets/images/mic.svg',
      iconSize: [26, 26],
      iconAnchor: [13, 13],
      popupAnchor: [4, -10]
    });

    for (var i = 0; i < events.length; i++) {
      markers[i] = L.marker([events[i].lat, events[i].long], { icon: micIcon })
        .addTo($scope.userMap)
        .bindPopup("Hello. I am a popup.")
        .on('click', onClick)
        .on('mouseover', mouseIn);
      markers[i].eventId = events[i].id;
    }

    function mouseIn() {
      this.openPopup();
    }

    function onClick(e) {
      var newPath = '/event/' + this.eventId;

      $location.path(newPath);
      $scope.$apply();
    }
  }
});
