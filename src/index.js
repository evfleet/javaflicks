import express from 'express';
import initMiddleware from 'config/middleware';
import constants from 'config/constants';
import routes from 'routes';
import 'config/database';

const app = express();

initMiddleware(app);

app.use('/api', routes);

app.listen(constants.PORT, () => {
  console.log(`Server running on port: ${constants.PORT}`);
});
