import createAPIResponse from 'helpers/createAPIResponse';
import User from 'models/user';

export default {
  async register(req, res) {
    const { username, email, password } = req.body;

    try {
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
    const { identifier, password } = req.body;

    try {
      const user = await User.find({ $or: [{ 'username': identifier }, { 'email': identifier }] });
      const validPassword = await (user ? user.comparePassword(password) : false);

      if (!validPassword) {
        throw new Error('Invalid email/password combination');
      }

      if (!user.verified) {
        throw new Error('Email not verified');
      }

      // create session, token etc

      return res.json(createAPIResponse(true, {

      }));
    } catch (error) {
      switch (error.message) {
        case 'Invalid email/password combination':
          return res.json(createAPIResponse(false, error.message, 401));
        case 'Email not verified':
          return res.json(createAPIResponse(false, error.message, 403));
        default:
          return res.json(createAPIResponse(false, 'Unexpected server error', 500));
      }
    }
  },

  async requestResetPassword(req, res) {
    const { email } = req.body;

    try {
      const user = await User.findOne({ email });

      if (user) {
        user.requestResetPassword();
      }

      return res.json(createAPIResponse(true, { success: true }));
    } catch (error) {
      return res.json(createAPIResponse(false, 'Unexpected server error', 500));
    }
  },

  async resetPassword(req, res) {
    const { email, password, token } = req.body;

    try {
      const user = await User.findOne({ email });
      const updated = await (user ? user.resetPassword(password, token) : false);

      if (!updated) {
        throw new Error('Invalid email/token combination');
      }

      return res.json(createAPIResponse(true, { success: true }));
    } catch (error) {
      switch (error.message) {
        case 'Invalid email/token combination':
          return res.json(createAPIResponse(false, error.message, 401));
        default:
          return res.json(createAPIResponse(false, 'Unexpected server error', 500));
      }
    }
  }
};
