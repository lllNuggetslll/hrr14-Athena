'use strict';

describe('navCtrl', function() {
  var $scope, $rootScope, $location, createController;

  beforeEach(module('karaoke'));
  beforeEach(inject(function($injector) {

    $rootScope = $injector.get('$rootScope');
    $location = $injector.get('$location');
    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function() {
      return $controller('navCtrl', {
        $scope: $scope,
        $location: $location
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

  it('should have a toggleClass function on the $scope', function() {
    expect($scope.toggleClass).to.be.a('function');
  });

  it('should toggle droppedDown when toggleClass is called', function() {
    $scope.toggleClass();
    expect($scope.droppedDown).to.equal(true);
    $scope.toggleClass();
    expect($scope.droppedDown).to.equal(false);
  });

  it('should always set droppedDown to false when the state changes', function() {
    $scope.toggleClass();
    // trigger a $locationChangeStart event
    $location.path('/login');
    $rootScope.$apply();
    expect($scope.droppedDown).to.equal(false);
  });
});