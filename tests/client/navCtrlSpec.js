'use strict';

describe('navCtrl', function() {
  var $scope, $rootScope, $location, authFactory, burgerService, createController;

  beforeEach(module('karaoke'));
  beforeEach(inject(function($injector) {

    $rootScope = $injector.get('$rootScope');
    $location = $injector.get('$location');
    authFactory = $injector.get('authFactory');
    burgerService = $injector.get('burgerService');
    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function() {
      return $controller('navCtrl', {
        $scope: $scope,
        $location: $location,
        authFactory: authFactory,
        burgerService: burgerService
      });
    };

    createController();

  }));


  it('should have a droppedDown property on the $scope', function() {
    expect($scope.droppedDown).to.be.a('boolean');
  });

  it('should start with droppedDown set to false', function() {
    expect($scope.droppedDown).to.equal(false);
  });

  it('should have a toggleMenu function on the $scope', function() {
    expect($scope.toggleMenu).to.be.a('function');
  });

  it('should toggle droppedDown when toggleMenu is called', function() {
    $scope.toggleMenu();
    expect($scope.droppedDown).to.equal(true);
    $scope.toggleMenu();
    expect($scope.droppedDown).to.equal(false);
  });

  it('should always set droppedDown to false when the state changes', function() {
    $scope.toggleMenu();
    // trigger a $locationChangeStart event
    $location.path('/login');
    $rootScope.$apply();
    expect($scope.droppedDown).to.equal(false);
  });

  it('should animate the hamburger icon when dropping down the menu', function() {
    var burgerOpen = chai.spy.on(burgerService, 'open');
    $scope.toggleMenu();
    expect(burgerOpen).to.have.been.called();
  });
});