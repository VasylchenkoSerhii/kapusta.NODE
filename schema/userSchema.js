const Joi = require('joi');

const userSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required()
    .regex(/@gmail\.com$/),
  password: Joi.string()
    .min(8)
    .messages({
      'string.pattern.base':
        'Invalid password: must contain length 7-30 characters; must be digits or latin letters.',
    })
    .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/)
    .required(),
});

const emailVerifyValidation = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required()
    .regex(/@gmail\.com$/),
});

module.exports = {
  userSchema,
  emailVerifyValidation,
};
