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

  async createAuthResponse(res, user) {
    const [ accessToken, refreshToken ] = await this.createTokens(user);

    res.cookie('refreshToken', refreshToken, { signed: true });

    return {
      ...JSON.parse(JSON.stringify(user)),
      accessToken,
      refreshToken
    };
  }
};
