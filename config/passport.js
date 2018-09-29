var bcrypt = require('bcryptjs');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');

module.exports = passport =>  {  
  // passport config

  // Serialize user for session
  // When user login to system at the first time, passport will store their sessions via _id.
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  // Deserialize user from session
  // When user login to system at the second time, passport will find id in session and return their user info.
  passport.deserializeUser((id, done) => {
    mongoose.model('delegates').findOne({ _id: id }, (err, user) => {
      if (err) done(err);
      if (user) {
        user.password = null
        done(err, user);
      }
    })
  });

  passport.use('local', new LocalStrategy(
    (email, password, done) => {
      mongoose.model('delegates').findOne({ email: email }, (err, userDoc) => {
        if (err) done(err);
        if (userDoc) {
          bcrypt.compare(password, userDoc.password, (err, isMatch) => {

            if (err) throw err;
            if (isMatch) {
              userDoc.password = null;
              console.log('aas')
              return done(null, userDoc);
            }
            // If password is wrong
            return done(null, false);
          })
        }
        // If cannot find user
        else return done(null, false);
      })
    }
  ));
};