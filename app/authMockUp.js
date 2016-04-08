// temporary page for auth code to be inserted where needed later. k?

//------- likely to be in server, router or middleware page

var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    //check for valid user and pass
    //functions possibly defined in helpers.js page
  }
));

//------- router example

app.get('/api/users/me',
  //disable sessions for use of tokens
  passport.authenticate('basic', { session: false }),
  function(req, res) {
    res.json({ id: req.user.id, username: req.user.username });
  });


// using JWT SIMPLE to persist and check tokens after login:
// ----- likely to be used in server/userController { signIn and signUp functions }

var jwt = require('jwt-simple');


//string on after successful use signin
.then(function (foundUser) {
  if (foundUser) {
    var token = jwt.encode(user, 'secret');
    res.json({token: token});
  } else {
    return next(new Error('No user'));
  }
});

// string on after successful user signup
.then(function (user) {
  // create token to send back for auth
  var token = jwt.encode(user, 'secret');
  res.json({token: token});
})


//checking token when necessary (from shortly/angular)
checkAuth: function (req, res, next) {
    // checking to see if the user is authenticated
    // grab the token in the header is any
    // then decode the token, which we end up being the user object
    // check to see if that user exists in the database
    var token = req.headers['x-access-token'];
    if (!token) {
      next(new Error('No token'));
    } else {
      var user = jwt.decode(token, 'secret');
      findUser({username: user.username})
        .then(function (foundUser) {
          if (foundUser) {
            res.send(200);
          } else {
            res.send(401);
          }
        })
        .fail(function (error) {
          next(error);
        });
    }
  }
