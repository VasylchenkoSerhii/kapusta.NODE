const mongoose = require('mongoose');

const schema = mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      match: [/[a-z0-9]+@[a-z0-9]+/, 'user email is not valid'],
    },
    password: {
      type: String,
      minLength: [6, 'password should be at least 6 characters long'],
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt files
    versionKey: false,
  }
);

const User = mongoose.model('user', schema);

module.exports = {
  User,
};
