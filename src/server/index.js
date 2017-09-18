import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import { graphqlExpress } from 'graphql-server-express';

import schema from 'schema';
import models from 'config/database';
import constants from 'config/constants';

const app = express();
const SessionStore = require('connect-session-sequelize')(session.Store);

app.use(bodyParser.json());

app.use(session({
  secret: constants.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new SessionStore({
    db: models.sequelize
  })
}));

app.use('/graphql', graphqlExpress((req) => ({
  schema,
  context: {
    req,
    models
  }
})));

models.sequelize.sync().then(() => {
  app.listen(constants.PORT, () => {
    console.log(`Server running on port: ${constants.PORT}`);
  });
});
