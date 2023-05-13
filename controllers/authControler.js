const bcrypt = require('bcrypt');
const { HttpError } = require('../helpers');
const { User } = require('../models/user');

async function register(req, res, next) {
  const { email, password } = req.body;

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const saveUser = await User.create({
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      data: {
        user: {
          email,
          id: saveUser._id,
        },
      },
    });
  } catch (error) {
    if (error.message.includes('E11000 duplicate key error')) {
      throw new HttpError(409, 'User with this email already exit');
    }
    throw error;
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;

  const storeUser = await User.findOne({
    email,
  });

  if (!storeUser) {
    throw new HttpError(401, 'email is not valid');
  }

  const isPasswordValid = await bcrypt.compare(password, storeUser.password);

  if (!isPasswordValid) {
    throw new HttpError(401, 'password is not valid');
  }

  return res.json({
    data: {
      token: '<TOKEN>',
    },
  });
}

module.exports = {
  register,
  login,
};
