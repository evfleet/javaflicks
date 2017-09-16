import CustomStrategy from 'passport-custom';
import LocalStrategy from 'passport-local';
import models from 'config/database';

export default (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    models.User.findById(id, (err, user) => {
      done(err, user);
    });
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
