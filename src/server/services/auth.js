import jwt from 'jsonwebtoken';
import constants from 'config/constants';

export default {
  createTokens: async (user) => {
    const signAccessToken = jwt.sign({
      payload: true
    }, constants.ACCESS_SECRET, {
      expiresIn: '1m'
    });

    const signRefreshToken = jwt.sign({
      payload: true
    }, `${constants.REFRESH_SECRET}${user.password}`, {
      expiresIn: '7d'
    });

    return Promise.all([ signAccessToken, signRefreshToken ]);
  }

};
