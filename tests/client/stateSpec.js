'use strict';

describe('State routing', function () {
  var $state;
  beforeEach(module('karaoke'));

  beforeEach(inject(function ($injector) {
    $state = $injector.get('$state');
  }));

  it('Should have a "home" state with a url, template, and controller', function () {
    expect($state.get('home')).to.be.defined;
    expect($state.get('home').url).to.equal('/');
    expect($state.get('home').templateUrl).to.equal('src/app/components/home/home.html');
    expect($state.get('home').controller).to.equal('homeCtrl');
  });

  it('Should have a "signup" state with a url, template, and controller', function () {
    expect($state.get('signup')).to.be.defined;
    expect($state.get('signup').url).to.equal('/signup');
    expect($state.get('signup').templateUrl).to.equal('src/app/components/auth/signup.html');
    expect($state.get('signup').controller).to.equal('authCtrl');
  });

  it('Should have a "login" state with a url, template, and controller', function () {
    expect($state.get('login')).to.be.defined;
    expect($state.get('login').url).to.equal('/login');
    expect($state.get('login').templateUrl).to.equal('src/app/components/auth/login.html');
    expect($state.get('login').controller).to.equal('authCtrl');
  });

  it('Should have an "event" state with a url, template, and controller', function () {
    expect($state.get('event')).to.be.defined;
    expect($state.get('event').url).to.equal('/event/:eventID');
    expect($state.get('event').templateUrl).to.equal('src/app/components/event/event.html');
    expect($state.get('event').controller).to.equal('eventCtrl');
  });

  it('Should have an "addevent" state with a url, template, and controller', function () {
    expect($state.get('addevent')).to.be.defined;
    expect($state.get('addevent').url).to.equal('/addevent');
    expect($state.get('addevent').templateUrl).to.equal('src/app/components/addevent/addevent.html');
    expect($state.get('addevent').controller).to.equal('addEventCtrl');
  });

  it('Should have authentication protection on the "addevent" state', function () {
    expect($state.get('addevent').authenticate).to.equal(true);
  });

});
