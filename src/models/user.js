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
  }
};

export default mongoose.model('User', UserSchema);
