import express from 'express';
import morgan from 'morgan';
import passport from 'passport';
import bodyParser from 'body-parser';
import session from 'express-session';

import database from 'config/database';
import constants from 'config/constants';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: constants.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

/*
  app.post('/register', (req, res) => {
    passport.authenticate('signup', (err, user) => {
      if (err) {
        return res.json({ error: true });
      }

      if (err) {
        return next(err); // will generate a 500 error
      }
      // Generate a JSON response reflecting authentication status
      if (! user) {
        return res.send({ success: false, message: 'authentication failed' });
      }
      // ***********************************************************************
      // "Note that when using a custom callback, it becomes the application's
      // responsibility to establish a session (by calling req.login()) and send
      // a response."
      // Source: http://passportjs.org/docs
      // ***********************************************************************
      req.login(user, loginErr => {
        if (loginErr) {
          return next(loginErr);
        }
        return res.send({ success: true, message: 'authentication succeeded' });
      });
    })(req, res);
  });
  */

app.listen(constants.PORT, () => { console.log(`Server running on port: ${constants.PORT}`); });
