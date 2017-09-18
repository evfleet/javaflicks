import passport from 'passport';

export default {
  register(req, res) {
    passport.authenticate('register', (err, user) => {
      if (err) {
        return res.json({ error: true });
      }

      if (!user) {
        return res.json({
          user: null
        });
      }

      return res.json({
        user
      });
    })(req, res);
  },

  login(req, res) {
    passport.authenticate('login', (err, user) => {
      if (err) {
        return res.json({ error: true });
      }

      if (!user) {
        return res.json({
          user: null
        });
      }

      req.login(user, (err) => {
        if (err) {
          return res.json({ error: true });
        }
        return res.send({ success: true, message: 'authentication succeeded' });
      });
    })(req, res);
  }
};
