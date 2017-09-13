import User from 'models/user';

export default {
  async register(req, res) {
    try {
      const { username, email, password } = req.body;
      const result = await User.create({ username, email, password });

      res.json({
        result
      });
    } catch (error) {
      console.log(error);
      res.json({
        error: true
      });
    }
  },

  async login(req, res) {

  }
};
