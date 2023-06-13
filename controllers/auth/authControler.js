const bcrypt = require('bcrypt');
const { HttpError } = require('../helpers');
const { User } = require('../models/user');
const jwt = require('jsonwebtoken');
const { v4 } = require('uuid');

const { JWT_SECRET } = process.env;

async function register(req, res, next) {
  const { email, password } = req.body;

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const verificationToken = v4();
    const saveUser = await User.create({
      email,
      password: hashedPassword,
      verificationToken,
    });

    // await sendEmail({
    //   to: email,
    //   subject: 'Please confirm your email',
    //   html: `<a target="_blank" href="http://localhost:3000/users/verify/${verificationToken}">Confirm your email</a>`,
    //   text: `Please, confirm your email address http://localhost:3000/users/verify/${verificationToken}`,
    // });

    return res.status(201).json({
      data: {
        user: {
          email,
          id: saveUser._id,
          verificationToken,
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

  // if (!storeUser.verify) {
  //   throw new HttpError(
  //     401,
  //     'Email is not verified! Please check your mailbox'
  //   );
  // }

  const isPasswordValid = await bcrypt.compare(password, storeUser.password);

  if (!isPasswordValid) {
    throw new HttpError(401, 'password is not valid');
  }

  const payload = { id: storeUser._id };
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: '2h',
  });
  await User.findByIdAndUpdate(storeUser._id, { token });

  return res.json({
    token,
    user: {
      email,
      id: storeUser._id,
    },
  });
}

const logout = async (req, res, next) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });

  return res.status(204).json({
    message: 'No Content',
  });
};

const verifyEmail = async (req, res, next) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({
    verificationToken,
  });

  if (!user) {
    throw new HttpError(404, 'User not found');
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  return res.json({
    message: 'Verification successful',
  });
};

const repeatVerifyEmail = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw new HttpError(404, 'User not found');
  }

  if (user.verify) {
    return res.status(400).json({
      message: 'Verification has already been passed',
    });
  }

  // await sendEmail({
  //   to: email,
  //   subject: 'Please, confirm your email',
  //   html: `<a target="_blank" href="http://localhost:3000/users/verify/${user.verificationToken}">Confirm your email</a>`,
  // });

  return res.json({
    message: 'Verification email success',
  });
};

module.exports = {
  register,
  login,
  logout,
  verifyEmail,
  repeatVerifyEmail,
};
