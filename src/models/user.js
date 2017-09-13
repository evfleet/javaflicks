import bcrypt from 'bcrypt';
import crypto from 'crypto';
import validator from 'validator';
import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    trim: true,
    unique: true,
    required: 'An email is required!',
    validate: [
      (email) => validator.isEmail(email),
      '{VALUE} is not a valid email!'
    ]
  },
  username: {
    type: String,
    trim: true,
    required: 'An username is required'
  },
  password: {
    type: String,
    trim: true,
    required: 'A password is required'
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
});

UserSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

UserSchema.methods = {
  async comparePassword(password) {
    return bcrypt.compare(password, this.password);
  },

  emailVerification(token) {
    if (token == this.verificationToken) {
      this.verified = true;
      this.verificationToken = null;
      this.save();
      return true;
    }
    return false;
  },

  requestResetPassword() {
    this.resetToken = crypto.randomBytes(32).toString('hex');
    this.resetExpires = new Date(Date.now() + 30 * 60000);
    this.save();
    return true;
  },

  resetPassword(password, token) {
    if (Date.now() > this.resetExpires || token != this.resetToken) {
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

export default mongoose.model('User', UserSchema);
