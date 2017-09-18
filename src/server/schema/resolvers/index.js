export default {
  Query: {
    getUser: async (parent, { email, username }, { req, models }) => {
      if (email || username) {
        return models.User.findOne({
          where: {
            $or: [{ email }, { username }]
          }
        });
      }

      // if neither, find current logged in user

      // else return null
      return null;
    }
  },

  Mutation: {
    login: async (parent, { identifier, password }, { models }) => {
      const user = await models.User.findOne({
        where: {
          $or: [{ email: identifier }, { username: identifier }]
        }
      });

      const validPassword = await (user ? user.comparePassword(password) : false);

      if (!validPassword) {
        throw new Error('Invalid account/password combination');
      }

      return user;
    },

    register: async (parent, { email, username, password }, { models }) => {
      // needs to handle duplicates
      // send email confirmation/notification

      return models.User.create({ username, email, password });
    }

    /*
    authenticate: async (parent, args, { models }) => {

    }
    */
  }
};
