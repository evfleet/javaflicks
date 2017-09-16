import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';

import init from './init';
import constants from 'config/constants';
import initPassport from 'config/passport';
import initMiddleware from 'config/middleware';

const app = express();

init.then(({ ROOT_URL }) => {
  mongoose.Promise = global.Promise;
  mongoose.connect(constants.DATABASE_URL, { useMongoClient: true });

  initPassport(passport);
  initMiddleware(app);

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
}).catch((error) => { console.log(error); });
