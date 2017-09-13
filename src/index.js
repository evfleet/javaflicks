import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import session from 'express-session';
import morgan from 'morgan';

import constants from 'config/constants';
import routes from 'routes';
import 'config/database';

const app = express();
const MongoStore = require('connect-mongo')(session);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: constants.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use('/api', routes);

app.listen(constants.PORT, () => {
  console.log(`Server running on port: ${constants.PORT}`);
});
