angular.module('karaoke.allevents', [])

.controller('allEventsCtrl', function($scope, $stateParams, eventFactory) {
  $scope.data = {};
  eventFactory.getAll()
    .then(function(response) {
      $scope.data.events = eventFactory.populateEvents(response);

      $scope.data.events.forEach(function(event) {
        rendermap(event.lat, event.long, event.eventId);
      });

    });

  var rendermap = function(lat, long, id) {
    var map = L.map('map_' + id).setView([lat, long], 15);  //<-- zoom level, larger is zoomed in
    L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
      attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      subdomains: 'abcd',
      minZoom: 0,
      maxZoom: 20,
      ext: 'png'
    }).addTo(map);
    var micIcon = L.icon({
      iconUrl: 'src/assets/images/mic.svg',
      iconSize: [26, 26],
      iconAnchor: [13, 13]
    });
    var marker = L.marker([lat, long], { icon: micIcon });
    marker.addTo(map);
  };

});
