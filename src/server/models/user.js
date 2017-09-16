import bcrypt from 'bcrypt';
import crypto from 'crypto';

async function hashPassword(user) {
  user.password = await bcrypt.hash(user.password, 12);
}

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    verificationToken: {
      type: DataTypes.STRING,
      defaultValue: crypto.randomBytes(32).toString('hex')
    },
    resetExpires: {
      type: DataTypes.DATE
    },
    resetToken: {
      type: DataTypes.STRING
    }
  }, {
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword
    }
  });

  User.prototype.comparePassword = async function(password) {
    return bcrypt.compare(password, this.password);
  };

  return User;
};
