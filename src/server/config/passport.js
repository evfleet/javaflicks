import CustomStrategy from 'passport-custom';

import models from 'config/database';
import constants from 'config/constants';

export default (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await models.User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  passport.use('register', new CustomStrategy(async (req, done) => {
    try {
      const { username, email, password } = req.body;
      const user = await models.User.create({ username, email, password });
      done(null, user);
    } catch (error) {
      done(error);
    }
  }));

  passport.use('login', new CustomStrategy(async (req, done) => {
    try {
      const { identifier, password } = req.body;
      const user = await models.User.findOne({
        where: {
          $or: [
            { email: identifier },
            { username: identifier }
          ]
        }
      });
      const validPassword = await (user ? user.comparePassword(password) : false);

      if (!validPassword) {
        throw new Error('Wrong password');
      }

      done(null, user);
    } catch (error) {
      done(error);
    }
  }));
};
