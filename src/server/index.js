import path from 'path';
import express from 'express';
import webpack from 'webpack';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';

import schema from './schema';
import models from './config/database';
import constants from './config/constants';

const app = express();

app.use(express.static(path.resolve(__dirname, '../../dist')));
app.use(bodyParser.json());
app.use(cookieParser(constants.COOKIE_SECRET, {
  httpOnly: true
}));

if (process.env.NODE_ENV === 'development') {
  const webpackConfig = require('../../webpack.config.dev.js');
  const compiler = webpack(webpackConfig);

  compiler.plugin('done', () => {
    Object.keys(require.cache).forEach((id) => {
      if (/[\/\\]client[\/\\]/.test(id)) delete require.cache[id];
    });
  });

  app.use(
    require('webpack-dev-middleware')(compiler, {
      publicPath: webpackConfig.output.publicPath,
      stats: {
        colors: true
      }
    })
  );

  app.use(require('webpack-hot-middleware')(compiler));

  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
  }));
}

app.use('/graphql', graphqlExpress((req, res) => ({
  schema,
  context: {
    req,
    res,
    models
  }
})));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../dist/index.html'));
});

models.sequelize.sync().then(() => {
  app.listen(constants.PORT, () => { console.log(`Server running on port: ${constants.PORT}`); });
});
