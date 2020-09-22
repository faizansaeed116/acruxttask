var LocalStrategy = require('passport-local').Strategy;
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

                UserModelObj.authenticateUser(username, password, function (user_details, status, message) {
                    if (status == true) {
                        user_details.PASSD = null;
                        return done(null, user_details);
                    } else {
                        return done(null, false, req.flash('loginMessage', 'Oops! ' + message));
                    }
                });

            }
        )
    );
};

