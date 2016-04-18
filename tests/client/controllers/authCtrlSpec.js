'use strict';

describe('AuthController', function () {
  var $scope, $rootScope, $location, $window, $httpBackend, createController, authFactory;

  beforeEach(module('karaoke'));
  beforeEach(inject(function ($injector) {

    $rootScope = $injector.get('$rootScope');
    $location = $injector.get('$location');
    $window = $injector.get('$window');
    $httpBackend = $injector.get('$httpBackend');
    authFactory = $injector.get('authFactory');
    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function () {
      return $controller('authCtrl', {
        $scope: $scope,
        $window: $window,
        $location: $location,
        authFactory: authFactory
      });
    };
    createController();
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
    $window.localStorage.removeItem('com.karaoke');
  });

  it('should have a user object on the scope', function() {
    expect($scope.user).to.be.an('object')
  });

  it('should have a signup method', function () {
    expect($scope.signup).to.be.a('function');
  });

  it('should store token in localStorage after signup', function () {
    var isValid = true;
    var token = 'sjj232hwjhr3urw90rof';
    $httpBackend.expectPOST('/api/users/signup').respond({token: token});
    $scope.signup(isValid);
    $httpBackend.flush();
    expect($window.localStorage.getItem('com.karaoke')).to.equal(token);
  });

  it('should redirect to /addEvent after successful signup', function() {
    var isValid = true;
    var token = 'sjj232hwjhr3urw90rof';
    $httpBackend.expectPOST('/api/users/login').respond({token: token});
    $scope.login(isValid);
    $httpBackend.flush();
    expect($location.$$path).to.equal('/addEvent');
  });

  it('should have a login method', function () {
    expect($scope.login).to.be.a('function');
  });

  it('should store token in localStorage after login', function () {
    var isValid = true;
    var token = 'sjj232hwjhr3urw90rof';
    $httpBackend.expectPOST('/api/users/login').respond({token: token});
    $scope.login(isValid);
    $httpBackend.flush();
    console.log($location.$$path)
    expect($window.localStorage.getItem('com.karaoke')).to.equal(token);
  });

  it('should redirect to /addEvent after successful login', function() {
    var isValid = true;
    var token = 'sjj232hwjhr3urw90rof';
    $httpBackend.expectPOST('/api/users/login').respond({token: token});
    $scope.login(isValid);
    $httpBackend.flush();
    expect($location.$$path).to.equal('/addEvent');
  });
});
