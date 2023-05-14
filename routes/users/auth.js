const express = require('express');
const { register, login, logout } = require('../../controllers/authControler');

const authRouter = express.Router();

const { tryCatchWrapper } = require('../../helpers');
const { auth, validateBody } = require('../../middlewares');
const { userSchema } = require('../../schema/userSchema');

authRouter.post(
  '/register',
  validateBody(userSchema),
  tryCatchWrapper(register)
);
authRouter.post('/login', validateBody(userSchema), tryCatchWrapper(login));
authRouter.get('/logout', auth, tryCatchWrapper(logout));

module.exports = {
  authRouter,
};
