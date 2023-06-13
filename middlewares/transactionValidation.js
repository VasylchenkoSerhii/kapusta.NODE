const Joi = require('joi');

const addTransactionValitation = (req, res, next) => {
  const schema = Joi.object({
    dateTransaction: Joi.date().required(),
    income: req.originalUrl.includes('income')
      ? Joi.boolean().valid(true).required()
      : Joi.boolean().valid(false).required(),
    sum: Joi.number().required(),
    category: Joi.string().required(),
    description: Joi.string().required(),
  });
  const validationResult = schema.validate(req.body);
  if (validationResult.error)
    return res.status(400).json({ message: validationResult.error.message });
  next();
};

module.exports = {
  addTransactionValitation,
};
