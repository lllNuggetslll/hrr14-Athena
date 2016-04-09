'use strict';

describe('Location Factory', function() {
  var $q, $window, locationFactory;

  beforeEach(module('karaoke.services'));
  beforeEach(inject(function(_$q_, _$window_, _locationFactory_) {
    $q = _$q_;
    $window = _$window_;
    locationFactory = _locationFactory_;
  }));

  it('Should exist', function() {
    expect(locationFactory).to.exist;
  });

  it('Should have a "getPosition" method', function() {
    expect(locationFactory.getPosition).to.be.a('function');
  });

  it('Should return a promise when "getPosition" is called', function() {
    expect(locationFactory.getPosition()).to.be.a('object');
    expect(locationFactory.getPosition().$$state).to.exist;
  });

  it('Should return a promise when "getPosition" is called that resolves with geolocation, if that service is available', function() {
    locationFactory.getPosition().then(function(pos) {
      expect(pos).to.be.a('object');
      expect(pos.coords).to.exist;
    });
  });

  it('Should return a promise when "getPosition" is called that rejects if geolocation is not available', function() {
    delete $window.navigator.geolocation;
    locationFactory.getPosition().then(function(response) {
      expect(response).to.be.a('string');
      expect(response).to.equal('geolocation not supported');
    });
  });
});
