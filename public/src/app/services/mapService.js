angular.module('karaoke.services')

.factory('mapService', function() {
  var renderMap = function(scope, lat, long, zoom, minZoom, maxZoom, mapId) {
    scope.map = L.map(mapId).setView([lat, long], zoom);  //<-- zoom level, larger is zoomed in
    L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
      attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      subdomains: 'abcd',
      minZoom: minZoom,
      maxZoom: maxZoom,
      ext: 'png'
    }).addTo(scope.map);
  };

  var addIcon = function(lat, long, map) {
    var micIcon = L.icon({
      iconUrl: 'src/assets/images/mic.svg',
      iconSize: [26, 26],
      iconAnchor: [13, 13]
    });
    var marker = L.marker([lat, long], { icon: micIcon });
    marker.addTo(map);
  };

  return {
    renderMap: renderMap,
    addIcon: addIcon
  };
});
