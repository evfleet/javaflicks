import jwt from 'jsonwebtoken';

import Auth from 'services/auth';
import constants from 'config/constants';

function createAuthResponse(res, user) {
  return new Promise(async (resolve, reject) => {
    try {
      const [ accessToken, refreshToken ] = await Auth.createTokens(user);

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
    authenticate: async (parent, { email, token }, { req, res, models }) => {
      try {
        const cookieToken = req.signedCookies.refreshToken;
        const user = await models.User.findOne({ where: { email } });

        if (!cookieToken || !user || token !== cookieToken) {
          throw new Error('Invalid authentication');
        }

        const decoded = await jwt.verify(token, `${constants.REFRESH_SECRET}${user.password}`);

        if (new Date().getTime() / 1000 > decoded.exp) {
          throw new Error('Expired token');
        } else {
          return Auth.createAuthResponse(res, user);
        }
      } catch (error) {
        switch (error.message) {
          case 'jwt malformed':
          case 'invalid signature':
          case 'Invalid authentication':
            throw new Error('Invalid authentication');
          case 'Expired token':
            throw new Error('Expired token');
          default:
            throw new Error('Unexpected server error');
        }
      }
    },

    login: async (parent, { identifier, password }, { req, res, models }) => {
      try {
        const user = await models.User.findOne({
          where: {
            $or: [{ email: identifier }, { username: identifier }]
          }
        });

        const validPassword = await (user ? user.comparePassword(password) : false);

        if (!validPassword) {
          throw new Error('Invalid account/password combination');
        } else {
          return Auth.createAuthResponse(res, user);
        }
      } catch (error) {
        switch (error.message) {
          case 'Invalid account/password combination':
            throw new Error(error.message);
          default:
            throw new Error('Unexpected server error');
        }
      }
    },

    register: async (parent, { email, username, password }, { models }) => {
      // needs to handle duplicates
      // send email confirmation/notification
      return models.User.create({ username, email, password });
    }
  }
};
