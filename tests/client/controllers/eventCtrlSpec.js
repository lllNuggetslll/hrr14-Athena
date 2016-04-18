'use strict';

describe('eventCtrl', function() {
  var $scope, $rootScope, $stateParams, eventFactory, mapService, $sce, createController;

  beforeEach(module('karaoke'));
  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $stateParams = $injector.get('$stateParams');
    eventFactory = $injector.get('eventFactory');
    mapService = $injector.get('mapService');
    $sce = $injector.get('$sce');
    $scope = $rootScope.$new();
    var $controller = $injector.get('$controller');

    eventFactory.eventId = 999;

    createController = function() {
      return $controller('eventCtrl', {
        $scope: $scope,
        $stateParams: $stateParams,
        eventFactory: eventFactory,
        mapService: mapService,
        $sce: $sce
      });
    };
    createController();
  }));

  it('should have .creator, .song, .artist, .date, .time, and .type properties on the $scope', function() {
    expect($scope.creator).to.be.a('string');
    expect($scope.song).to.be.a('string');
    expect($scope.artist).to.be.a('string');
    expect($scope.date).to.be.a('string');
    expect($scope.time).to.be.a('string');
    expect($scope.type).to.be.a('string');
  });

  it('should have a loadingMessage and start with loading set to true', function() {
    expect($scope.loadingMessage).to.be.a('string');
    expect($scope.loading).to.equal(true);
  });

  it('should call getOne to retrieve event information', function() {
    var getOne = chai.spy.on(eventFactory, 'getOne');
    setTimeout(function() {
      expect(getOne).to.have.been.called();
    }, 1000);
  });

  it('should call getOne with the eventId specified in the $stateParams', function() {
    var getOne = chai.spy.on(eventFactory, 'getOne');
    setTimeout(function() {
      expect(getOne).to.have.been.called.with(999);
    }, 1000);
  });

  it('should call trustAsResourceUrl after getting response back from eventFactory', function() {
    var trustAsResourceUrl = chai.spy.on($sce, 'trustAsResourceUrl');
    setTimeout(function() {
      expect(trustAsResourceUrl).to.have.been.called();
    }, 2000);
  });

  it('should render a map after getting response back from eventFactory', function() {
    var renderMap = chai.spy.on(mapService, 'renderMap');
    setTimeout(function() {
      expect(renderMap).to.have.been.called();
    }, 2000);
  });

  it('should add an icon to the map after getting response back from eventFactory', function() {
    var addIcon = chai.spy.on(mapService, 'addIcon');
    setTimeout(function() {
      expect(addIcon).to.have.been.called();
    }, 2000);
  });

  it('should set loading to false after getting response back from eventFactory', function() {
    setTimeout(function() {
      expect($scope.loading).to.equal(false);
    }, 2000);
  });
});