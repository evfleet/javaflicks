import express from 'express';
import morgan from 'morgan';
import passport from 'passport';
import bodyParser from 'body-parser';
import session from 'express-session';

import database from 'config/database';
import constants from 'config/constants';
import initPassport from 'config/passport';

const app = express();
const SessionStore = require('connect-session-sequelize')(session.Store);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: constants.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new SessionStore({
    db: database.sequelize
  })
}));

initPassport(passport);

app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.post('/register', (req, res) => {
  passport.authenticate('register', (err, user) => {
    if (err) {
      return res.json({ error: true });
    }

    if (!user) {
      return res.json({
        user: null
      });
    }

    return res.json({
      user
    });
  })(req, res);
});

app.post('/login', (req, res) => {
  passport.authenticate('login', (err, user) => {
    if (err) {
      return res.json({ error: true });
    }

    if (!user) {
      return res.json({
        user: null
      });
    }

    req.login(user, (err) => {
      if (err) {
        return res.json({ error: true });
      }
      return res.send({ success: true, message: 'authentication succeeded' });
    });
  });
});

app.listen(constants.PORT, () => {
  database.sequelize.sync().then(() => {
    console.log('Sequelize running');
  });
  console.log(`Server running on port: ${constants.PORT}`);
});
