const express = require('express');
const {
  register,
  login,
  logout,
  verifyEmail,
  repeatVerifyEmail,
  getCurrentUser,
} = require('../../controllers/authControler');

const authRouter = express.Router();

const { tryCatchWrapper } = require('../../helpers');
const { auth, validateBody } = require('../../middlewares');
const {
  userSchema,
  emailVerifyValidation,
} = require('../../schema/userSchema');

authRouter.post(
  '/register',
  validateBody(userSchema),
  tryCatchWrapper(register)
);
authRouter.post('/login', validateBody(userSchema), tryCatchWrapper(login));
authRouter.get('/logout', auth, tryCatchWrapper(logout));
authRouter.get('/current', auth, tryCatchWrapper(getCurrentUser));
authRouter.get('/verify/:verificationToken', tryCatchWrapper(verifyEmail));
authRouter.post(
  '/verify',
  validateBody(emailVerifyValidation),
  tryCatchWrapper(repeatVerifyEmail)
);

module.exports = {
  authRouter,
};
