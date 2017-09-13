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
