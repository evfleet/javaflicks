import jwt from 'jsonwebtoken';

import constants from '../config/constants';

export default {
  async createTokens({ id, email, username, password }) {
    const signAccessToken = jwt.sign({
      id,
      email,
      username
    }, constants.ACCESS_SECRET, {
      expiresIn: '5m'
    });

    const signRefreshToken = jwt.sign({
      id,
      email,
      username
    }, `${constants.REFRESH_SECRET}${password}`, {
      expiresIn: '7d'
    });

    return Promise.all([ signAccessToken, signRefreshToken ]);
  },

  createAuthResponse(res, user) {
    return new Promise(async (resolve, reject) => {
      try {
        const [ accessToken, refreshToken ] = await this.createTokens(user);

        res.cookie('refreshToken', refreshToken, { signed: true });

        resolve({
          ...JSON.parse(JSON.stringify(user)),
          accessToken,
          refreshToken
        });
      } catch (error) {
        reject(error);
      }
    });
  }
};
