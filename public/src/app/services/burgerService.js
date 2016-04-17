angular.module('karaoke.services')

.factory('burgerService', function() {
  var burgerLine1 = document.getElementById('burgerLine1');
  var burgerLine2 = document.getElementById('burgerLine2');
  var burgerLine3 = document.getElementById('burgerLine3');

  var burgerOpen = function() {
    Velocity(burgerLine1, { y1: '+= 6', y2: '+= 6' }, { duration: 400 });
    Velocity(burgerLine1, { y1: '+= 7', y2: '-= 7'}, { duration: 400 });
    Velocity(burgerLine2, { strokeOpacity: '0' }, { duration: 400 });
    Velocity(burgerLine3, { y1: '-= 6', y2: '-= 6' }, { duration: 400 });
    Velocity(burgerLine3, { y1: '-= 7', y2: '+= 7'}, { duration: 400 });
  };

  var burgerClose = function() {
    Velocity(burgerLine1, { y1: '-= 7', y2: '+= 7' }, { duration: 400 });
    Velocity(burgerLine1, { y1: '-= 6', y2: '-= 6'}, { duration: 400 });
    Velocity(burgerLine2, { strokeOpacity: '1' }, { duration: 400, delay: 400 });
    Velocity(burgerLine3, { y1: '+= 7', y2: '-= 7' }, { duration: 400 });
    Velocity(burgerLine3, { y1: '+= 6', y2: '+= 6'}, { duration: 400 });
  };

  return {
    open: burgerOpen,
    close: burgerClose
  };
});
