import express from 'express';

import initMiddleware from './config/middleware';
import constants from './config/constants';
import './config/database';

const app = express();

initMiddleware(app);

app.get('/', (req, res) => {
  res.json({});
});

app.listen(constants.PORT, () => {
  console.log(`Server running on port: ${constants.PORT}`);
});
