angular.module('karaoke.event', [])

.controller('eventCtrl', function($scope, $stateParams, eventFactory) {

  $scope.creator = '';
  $scope.song = '';
  $scope.artist = '';
  $scope.date = '';
  $scope.time = '';

  eventFactory.getOne($stateParams.eventID)
  .then(function(response) {
    var date = parseTime(response.time);
    $scope.creator = response.user.username;
    $scope.song = response.song_title;
    $scope.artist = response.as_sung_by;    
    $scope.date = date.day;
    $scope.time = date.time;
    
    rendermap(response.location_point.x, response.location_point.y);
  });

  function parseTime(timestamp) {
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var date = new Date(timestamp);

    var meridian = 'AM';
    var hours = date.getHours();
    var minutes = date.getMinutes();

    if (hours === 0) {
      hours = 12;
    } else if (hours === 12) {
      meridian = 'PM';
    } else if (hours > 12) {
      hours = hours - 12;
      meridian = 'PM';
    }

    if (minutes < 10) {
      minutes = '0' + minutes;
    }

    var day = weekdays[date.getDay()];
    day += ', ' + months[date.getMonth()];
    day += ' ' + date.getDate();

    var time = '' + hours;
    time += ':' + minutes;
    time += ' ' + meridian;

    return {
      day : day,
      time : time
    };
  }

  var rendermap = function(lat, long) {
    var map = L.map('event_map').setView([lat, long], 15);  //<-- zoom level, larger is zoomed in
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