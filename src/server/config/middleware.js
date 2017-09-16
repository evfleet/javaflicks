import morgan from 'morgan';
import mongoose from 'mongoose';
import passport from 'passport';
import bodyParser from 'body-parser';
import session from 'express-session';

import constants from 'config/constants';

const Store = require('connect-mongo')(session);

export default (app) => {
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(session({
    secret: constants.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new Store({ mongooseConnection: mongoose.connection })
  }));

  app.use(passport.initialize());
  app.use(passport.session());
};
