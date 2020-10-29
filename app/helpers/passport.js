var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');
var md5 = require('md5');

module.exports = function (passport) {

    passport.serializeUser(function (user, done) {
      
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
       
        if (!user || (typeof user === 'undefined')) {
            return done("Unknown Error", null);
        } else {
            return done(null, user);
        }
    });

    passport.use(
        'local-login',
        new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
            function (req, username, password, done) {

                ContactModelObj.authenticateUser(username, password, function (user, status, message) {
                    if (status == true) {
                        user.PASSWORD = null;
                        return done(null, user);
                    } else {
                        return done(null, false, req.flash('loginMessage', 'Oops! ' + message));
                    }
                });

            }
        )
    );
};

