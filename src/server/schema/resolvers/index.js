export default {
  Query: {
    getUser: async (parent, { id }, { req, models }) => {
      if (id) {
        return models.User.findById(id);
      }

      if (req.user) {
        return req.user;
      }

      return null;
    }
  }

  /*
  Mutation: {
    register: async (parent, args, { models }) => {

    }
  }
  */
};
