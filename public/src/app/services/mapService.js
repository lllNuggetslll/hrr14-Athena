angular.module('karaoke.services')

.factory('mapService', function(eventFactory) {
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

  var populateMap = function(scope, location, events) {
    var markers = [];
    var micIcon = L.icon({
      iconUrl: 'src/assets/images/mic.svg',
      iconSize: [26, 26],
      iconAnchor: [13, 13],
      popupAnchor: [4, -10]
    });

    events.forEach(function(event, i) {
      markers[i] = L.marker([event.lat, event.long], { icon: micIcon })
        .addTo(scope.map)
        .bindPopup(buildPopup(event))
        .on('click', onClick)
        .on('mouseover', mouseIn);
      markers[i].eventId = event.id;
    });

    function buildPopup(e) {
      var date = eventFactory.parseTime(e.time);
      var popup = '<div><b style="font-size:1.2em">' + e.song_title + '</b> by <b style="font-size:1.2em">' + e.as_sung_by + '</b></div>';
      popup += '<div>' + date.day + ' <span class="deemphasize">at</span> ' + date.time + '</div>';
      popup += '<a href="#/event/' + e.id + '">Link to Event</a>';
      return popup;
    }

    function mouseIn() {
      this.openPopup();
    }

    function onClick(e) {
      var newPath = '/event/' + this.eventId;
      location.path(newPath);
      scope.$apply();
    }
  };

  var eventMapClickHandler = function(e) {
    var coords = e.latlng;
    var micIcon = L.icon({
      iconUrl: 'src/assets/images/mic.svg',
      iconSize: [26, 26],
      iconAnchor: [13, 13]
    });
    // if a marker has been placed previously, remove it
    if (this.marker) {
      this.map.removeLayer(this.marker);
    }
    this.marker = L.marker([coords.lat, coords.lng], { icon: micIcon });
    // add the coords used for the marker to the event object
    this.event.location = { lat : coords.lat, long : coords.lng };
    this.marker.addTo(this.map);
  };

  return {
    renderMap: renderMap,
    addIcon: addIcon,
    populateMap: populateMap,
    eventMapClickHandler: eventMapClickHandler
  };
});
