const express = require('express');
const {
  register,
  login,
  logout,
  verifyEmail,
  repeatVerifyEmail,
} = require('../../controllers/auth/authControler');

const authRouter = express.Router();

const { tryCatchWrapper } = require('../../helpers');
const { auth, validateBody } = require('../../middlewares/auth');
const {
  userSchema,
  emailVerifyValidation,
} = require('../../schema/userSchema');
const { userBalanceValidation } = require('../../middlewares/authValidation');
const {
  updateUserBalance,
  getCurrentUser,
} = require('../../controllers/auth/userController');
const {
  googleAuthController,
  googleRedirectController,
} = require('../../controllers/auth/googleAuthControler');

authRouter.post(
  '/register',
  validateBody(userSchema),
  tryCatchWrapper(register)
);
authRouter.post('/login', validateBody(userSchema), tryCatchWrapper(login));
authRouter.get('/logout', tryCatchWrapper(auth), tryCatchWrapper(logout));
authRouter.get(
  '/current',
  tryCatchWrapper(auth),
  tryCatchWrapper(getCurrentUser)
);
authRouter.get('/verify/:verificationToken', tryCatchWrapper(verifyEmail));
authRouter.post(
  '/verify',
  validateBody(emailVerifyValidation),
  tryCatchWrapper(repeatVerifyEmail)
);
authRouter.patch(
  '/balance',
  tryCatchWrapper(auth),
  tryCatchWrapper(userBalanceValidation),
  tryCatchWrapper(updateUserBalance)
);
authRouter.get('/google', tryCatchWrapper(googleAuthController));
authRouter.get('/google-redirect', tryCatchWrapper(googleRedirectController));

module.exports = {
  authRouter,
};
