import Sequelize from 'sequelize';

import constants from './constants';

const sequelize = new Sequelize(constants.DATABASE_URL);

const db = {
  User: sequelize.import('../models/user'),
  List: sequelize.import('../models/list'),
  Recipe: sequelize.import('../models/recipe'),
  Review: sequelize.import('../models/review')
};

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

export default db;
