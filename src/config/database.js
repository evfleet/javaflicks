import mongoose from 'mongoose';
import constants from './constants';

mongoose.Promise = global.Promise;
mongoose.connect(constants.DATABASE_URL, { useMongoClient: true });

mongoose.connection
  .once('open', () => console.log('MongoDB running'))
  .on('error', (error) => {
    throw error;
  });
