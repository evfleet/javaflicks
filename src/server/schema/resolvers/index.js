import jwt from 'jsonwebtoken';

import constants from 'config/constants';
import authService from 'services/auth';
import emailService from 'services/email';

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
    authenticate: async (parent, { email, refreshToken }, { req, res, models }) => {
      try {
        const cookieToken = req.signedCookies.refreshToken;
        const user = await models.User.findOne({ where: { email } });

        /*
        if (!cookieToken || !user || refreshToken !== cookieToken) {
          throw new Error('Invalid authentication');
        }
        */

        const decoded = await jwt.verify(refreshToken, `${constants.REFRESH_SECRET}${user.password}`);

        if (new Date().getTime() / 1000 > decoded.exp) {
          throw new Error('Expired token');
        } else {
          return authService.createAuthResponse(res, user);
        }
      } catch (error) {
        switch (error.message) {
          case 'jwt malformed':
          case 'Expired token':
          case 'invalid signature':
          case 'Invalid authentication':
            throw new Error('Invalid authentication');
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
        }

        if (!user.verified) {
          throw new Error('Email has not been verified');
        } else {
          return authService.createAuthResponse(res, user);
        }
      } catch (error) {
        switch (error.message) {
          case 'Invalid account/password combination':
            throw new Error(error.message);
          case 'Email has not been verified':
            throw new Error(error.message);
          default:
            throw new Error('Unexpected server error');
        }
      }
    },

    register: async (parent, { email, username, password }, { models }) => {
      try {
        const { verificationToken } = await models.User.create({ username, email, password });
        await emailService.sendVerification(email, verificationToken);
        return { success: true };
      } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
          switch (error.errors[0].path) {
            case 'email':
              await emailService.sendNotification(email);
              return { success: true };
            case 'username':
              throw new Error('Username already taken');
          }
        } else {
          throw new Error('Unexpected server error');
        }
      }
    }
  }
};
