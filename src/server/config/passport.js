import LocalStrategy from 'passport-local';

import User from 'models/user';

export default (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use('signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, email, password, done) => {
    try {
      const user = await User.create({
        username: req.body.username,
        local: {
          email,
          password
        }
      });
      return done(null, user);
    } catch (error) {
      done(error);
    }
  }));

  /*
  passport.use('local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, identifier, password, done) => {

  }));
  */
};
