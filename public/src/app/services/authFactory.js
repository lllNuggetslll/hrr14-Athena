angular.module('karaoke.services')

.factory('authFactory', function($http, $location, $window) {
  var login = function(user) {
    return $http({
        method: 'POST',
        url: '/api/users/login',
        data: user
      })
      .then(function(resp) {
        //back end funcionality needed for routes and DB
        return resp.data.token;
      });
  };

  var signup = function(user) {
    return $http({
        method: 'POST',
        url: '/api/users/signup',
        data: user
      })
      .then(function(resp) {
        //back end funcionality needed for routes and DB
        return resp.data.token;
      });
  };

  var isAuth = function() {
    return !!$window.localStorage.getItem('com.karaoke');
  };

  var logout = function() {
    $window.localStorage.removeItem('com.karaoke');
    $location.path('/login');
  };

  return {
    login: login,
    signup: signup,
    isAuth: isAuth,
    logout: logout
  };
})
.factory('AttachTokens', function ($window) {
  // this is an $httpInterceptor
  // its job is to stop all out going request
  // then look in local storage and find the user's token
  // then add it to the header so the server can validate the request
  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('com.karaoke');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
});