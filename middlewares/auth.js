const jwt = require('jsonwebtoken');
const { HttpError } = require('../helpers');
const { User } = require('../models/user');

function validateBody(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return next(HttpError(400, error.message));
    }

    return next();
  };
}

async function auth(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const [type, token] = authHeader.split(' ');

  try {
    if (type !== 'Bearer') {
      throw HttpError(401, 'token type is not valid');
    }

    if (!token) {
      throw HttpError(401, 'no token provided');
    }

    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(id);

    if (!user || !user.token) {
      throw HttpError(401, 'Not authorized');
    }
    req.token = token;
    req.user = user;
  } catch (err) {
    if (err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError') {
      throw HttpError(401, 'Jwt token is not valid');
    }
    throw err;
  }
  next();
}

module.exports = {
  validateBody,
  auth,
};
