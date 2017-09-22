import crypto from 'crypto';
import jwt from 'jsonwebtoken';

import constants from 'config/constants';
import authService from 'services/auth';
import emailService from 'services/email';

export default {
  Query: {
    async getUser(parent, { email, username }, { req, models }) {
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
    async authenticate(parent, { email, refreshToken }, { req, res, models }) {
      try {
        const cookieToken = req.signedCookies.refreshToken;
        const user = await models.User.findOne({ where: { email } });

        if (!cookieToken || !user || refreshToken !== cookieToken) {
          throw new Error('Invalid authentication');
        }

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

    async login(parent, { identifier, password }, { req, res, models }) {
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

    async register(parent, { email, username, password }, { models }) {
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
    },

    async verification(parent, { email, verificationToken }, { models }) {
      try {
        const user = await models.User.findOne({ where: { email } });

        if (!user || verificationToken !== user.verificationToken) {
          throw new Error('Invalid verification');
        } else {
          await models.User.update({
            verified: true,
            verificationToken: null
          }, { where: { email } });

          return { success: true };
        }
      } catch (error) {
        switch (error.message) {
          case 'Invalid verification':
            throw new Error(error.message);
          default:
            throw new Error('Unexpected server error');
        }
      }
    },

    async requestResetPassword(parent, { email }, { models }) {
      try {
        const user = await models.User.findOne({ where: { email } });

        if (!user) {
          return { success: true };
        } else {
          const currentTime = new Date();
          const resetToken = crypto.randomBytes(32).toString('hex');
          const resetExpires = currentTime.setMinutes(currentTime.getMinutes() + 30);

          await models.User.update({ resetExpires, resetToken }, { where: { email } });

          return { success: true };
        }
      } catch (error) {
        throw new Error('Unexpected server error');
      }
    },

    async resetPassword(parent, { email, resetToken, password }, { models }) {
      try {
        const user = await models.User.findOne({ where: { email } });

        if (!user || resetToken !== user.resetToken) {
          throw new Error('Invalid reset token');
        }

        if (new Date().getTime() > user.resetExpires) {
          throw new Error('Password reset expired');
        }

        await models.User.update({
          password,
          resetExpires: null,
          resetToken: null
        }, { where: { email }, individualHooks: true });

        return { success: false };
      } catch (error) {
        switch (error.message) {
          case 'Invalid reset token':
          case 'Password reset expired':
            throw new Error(error.message);
          default:
            throw new Error('Unexpected server error');
        }
      }
    }
  }
};
