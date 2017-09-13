import createAPIResponse from 'helpers/createAPIResponse';
import Email from 'services/Email';
import User from 'models/user';

export default {
  async register(req, res) {
    try {
      const { username, email, password } = req.body;

      await User.create({ username, email, password });

      return res.json(createAPIResponse(true, { success: true }, 200));
    } catch (error) {
      if (error.code && error.code === 11000) {
        return res.json(createAPIResponse(true, { success: true }, 200));
      }
      return res.json(createAPIResponse(false, 'Unexpected server error', 500));
    }
  },

  async login(req, res) {

  }
};
