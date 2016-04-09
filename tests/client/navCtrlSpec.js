'use strict';

describe('navCtrl', function() {
  var $scope, $rootScope, $location, createController;

  beforeEach(module('karaoke'));
  beforeEach(inject(function($injector) {

    $rootScope = $injector.get('$rootScope');
    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function() {
      return $controller('navCtrl', {
        $scope: $scope
      });
    };

    createController();
  }));


  it('should have a droppedDown property on the $scope', function() {
    expect($scope.droppedDown).to.be.a('boolean');
  });
});