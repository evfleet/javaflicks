// @flow
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import validator from 'validator';
import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    unique: true
  },
  local: {
    email: {
      type: String,
      trim: true,
      unique: true,
      validate: [
        (email) => validator.isEmail(email),
        '{VALUE} is not a valid email!'
      ]
    },
    password: {
      type: String,
      trim: true
    },
    verified: {
      type: Boolean,
      default: false
    },
    verificationToken: {
      type: String,
      default: crypto.randomBytes(32).toString('hex')
    },
    resetExpires: {
      type: Date
    },
    resetToken: {
      type: String
    }
  }
});

UserSchema.pre('save', async function(next) {
  if (this.isModified('local.password')) {
    this.local.password = await bcrypt.hash(this.local.password, 12);
  }
  next();
});

/*
UserSchema.methods = {
  async comparePassword(password: string): Promise<any> {
    return bcrypt.compare(password, this.password);
  },

  emailVerification(token: string): boolean {
    if (token == this.verificationToken) {
      this.verified = true;
      this.verificationToken = null;
      this.save();
      return true;
    }
    return false;
  },

  requestResetPassword(): boolean {
    this.resetToken = crypto.randomBytes(32).toString('hex');
    this.resetExpires = new Date(Date.now() + 30 * 60000);
    this.save();
    return true;
  },

  resetPassword(password: string, token: string): boolean {
    if (Date.now() > this.resetExpires || token !== this.resetToken) {
      return false;
    } else {
      this.resetToken = null;
      this.resetExpires = null;
      this.password = password;
      this.save();
      return true;
    }
  }
};
*/

export default mongoose.model('User', UserSchema);
