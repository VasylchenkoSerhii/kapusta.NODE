const { HttpError } = require('../helpers');
const { User } = require('../models/user');

const getUser = async ({ _id, token }, next) => {
  const user = await User.findOne({ _id, token });
  if (!user) {
    return next(HttpError(404, 'User does`t exist or unauthorized'));
  }
  return user;
};

module.exports = {
  getUser,
};
