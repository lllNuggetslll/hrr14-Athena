// // ******** commented everything out to satisfy linter ************

// select entire page to uncomment, as comments are now double commented. get it?


// // temporary page for auth code to be inserted where needed later. k?




// //------- likely to be in middleware or passport.js page - export to routes.js or server.js

// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;

// // FOR SIGN UP

// passport.use('localSignup', new LocalStrategy( {
//   usernameField: 'email',
//   passwordField: 'password',
//   passReqToCallback: true
// },
// function(req, email, password, done) {

//   //not sure what nextTick does yet? ... something to do with async it seems
//   process.nextTick(function() {
//   //check DB for user
//     //if none by that email
//       //create user
//       //bcrypt pass
//           //functions to be defined in userModel or the like
//           //see below for token doling out upon successful sign in and sign up
//           //promisify any DB process happening here to tag on token business defined below
//   });
// }));

// // FOR SIGN IN

// passport.use('local-login', new LocalStrategy({
//   // by default, local strategy uses username and password, we will override with email
//   usernameField : 'email',
//   passwordField : 'password',
//   passReqToCallback : true // allows us to pass back the entire request to the callback
// },
// function(req, email, password, done) { // callback with email and password from our form

// //example didn't use  <process.nextTick(function(){}> here but does in signup. why?

// //check DB for user and compare passwords function to be defined with user model
// //tag on token if successful possibly handled inside user model functions
//   //MODULARIZE, dood!

// }));





// // ------- in server or routes.js

// // use local strategy above to process signup request
// app.post('/signup', passport.authenticate('local-signup', {
//   successRedirect : '/create', // redirect to the secure section
//   failureRedirect : '/signup', // redirect back to the signup page if there is an error
//   failureFlash : true // allow flash messages
// }));

// //use local-login from above
// app.post('/login', passport.authenticate('local-login', {
//   successRedirect : '/create', // redirect to the secure section
//   failureRedirect : '/login', // redirect if there is an error
//   failureFlash : true // allow flash messages
// }));


// //If the built-in options (SEE ABOVE) are not sufficient for handling an authentication request, 
// //a custom callback can be provided to allow the application to handle success or failure (SEE BELOW)


// app.get('/login', function(req, res, next) {
//   passport.authenticate('local-login', function(err, user, info) {
//     if (err) { return next(err); }
//     if (!user) { return res.redirect('/login'); }
//     req.logIn(user, function(err) {
//       if (err) { return next(err); }
//       return res.redirect('/users/' + user.username);
//     });
//   })(req, res, next);
// });






// //-------    <<<<<<<<<<<< api router example >>>>>>>>>>>>>>>>

// app.get('/api/...?',
//   //disable sessions for use of tokens
//   passport.authenticate('local', { session: false }),
//   function(req, res) {
//     // possibly integrate token check here
//     // OR
//     // refer to shortly.angular for that token check strategy
//   });




// //              <<<<<<<<<<<< JWT SIMPLE >>>>>>>>>>>


// // using JWT SIMPLE to persist and check tokens after login:
// // ----- likely to be used in signIn and signUp functions (SEE TOP)

// // var jwt = require('jwt-simple');


// // string on after successful user signin


// .then(function (foundUser) {
//   if (foundUser) {
//     var token = jwt.encode(user, 'secret');
//     res.json({token: token});
//   } else {
//     return next(new Error('No user'));
//   }
// });

// // string on after successful user signup
// .then(function (user) {
//   // create token to send back for auth
//   var token = jwt.encode(user, 'secret');
//   res.json({token: token});
// })


// //checking token when necessary (from shortly/angular)

// checkAuth: function (req, res, next) {
//     // checking to see if the user is authenticated
//     // grab the token in the header is any
//     // then decode the token, which we end up being the user object
//     // check to see if that user exists in the database
//     var token = req.headers['x-access-token'];
//     if (!token) {
//       next(new Error('No token'));
//     } else {
//       var user = jwt.decode(token, 'secret');
//       findUser({username: user.username})
//         .then(function (foundUser) {
//           if (foundUser) {
//             res.send(200);
//           } else {
//             res.send(401);
//           }
//         })
//         .fail(function (error) {
//           next(error);
//         });
//     }
//   }
