const { HttpError } = require('../helpers');
const Joi = require('joi');

const userBalanceValidation = (req, res, next) => {
  const schema = Joi.object({
    balance: Joi.number().required(),
  });
  const validation = schema.validate(req.body);
  if (validation.error) {
    return next(HttpError(400, validation.error.message));
  }
  next();
};

module.exports = { userBalanceValidation };
