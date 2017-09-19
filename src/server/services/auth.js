import jwt from 'jsonwebtoken';

import constants from 'config/constants';

export default {
  async createTokens(user) {
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
