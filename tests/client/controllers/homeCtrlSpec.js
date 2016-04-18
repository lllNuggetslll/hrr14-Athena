'use strict';

describe('homeCtrl', function() {
  var $scope, $rootScope, $location, locationFactory, eventFactory, mapService, createController;

  beforeEach(module('karaoke'));
  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $location = $injector.get('$location');
    locationFactory = $injector.get('locationFactory');
    eventFactory = $injector.get('eventFactory');
    mapService = $injector.get('mapService');
    $scope = $rootScope.$new();
    var $controller = $injector.get('$controller');

    createController = function() {
      return $controller('homeCtrl', {
        $scope: $scope,
        $rootScope: $rootScope,
        $location: $location,
        locationFactory: locationFactory,
        eventFactory: eventFactory,
        mapService: mapService
      });
    };
    createController();
  }));

  it('should have .lat and .long properties on the $scope', function() {
    expect($scope.lat).to.be.a('string');
    expect($scope.long).to.be.a('string');
  });

  it('should start a loadingMessage and loading set to true', function() {
    expect($scope.loadingMessage).to.be.a('string');
    expect($scope.loading).to.equal(true);
  });

  describe('setting user location if it is already set on $rootScope', function() {
    beforeEach(function() {
      $rootScope.userLocation = {
        latitude: 42,
        longitude: -70
      };
    });

    it('should use $rootScope.userLocation to set the .lat and .long properties, if that property exists', function() {
      setTimeout(function() {
        expect($scope.lat).to.equal(42);
        expect($scope.long).to.equal(-70);
      }, 1000);
    });

    it('should not call getPosition if $rootScope.userLocation exists', function() {
      var getPosition = chai.spy.on(locationFactory, 'getPosition');
      setTimeout(function() {
        expect(getPosition).to.not.have.been.called.once;
      }, 1000);
    });

    it('should call renderMap once the location has been established', function() {
      var renderMap = chai.spy.on(mapService, 'renderMap');
      setTimeout(function() {
        expect(renderMap).to.have.been.called();
      });
    });

    it('should call getInArea once the location has been established', function() {
      var getInArea = chai.spy.on(eventFactory, 'getInArea');
      setTimeout(function() {
        expect(getInArea).to.have.been.called();
      });
    });

    it('should set $scope.loading to false once the location is established', function() {
      setTimeout(function() {
        expect($scope.loading).to.equal(false);
      });
    });
  });

  describe('setting user location if it has not been set on $rootScope', function() {
    beforeEach(function() {
      delete $rootScope.userLocation;
    });

    it('should call getPosition to establish user location', function() {
      var getPosition = chai.spy.on(locationFactory, 'getPosition');
      setTimeout(function() {
        expect(getPosition).to.have.been.called();
      }, 1000);
    });
  });
});