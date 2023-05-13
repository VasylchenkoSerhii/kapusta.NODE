const express = require('express');

const { tryCatchWrapper } = require('../../helpers');
const { register, login } = require('../../controllers/authControler');

const authRouter = express.Router();

authRouter.post('/register', tryCatchWrapper(register));
authRouter.post('/login', tryCatchWrapper(login));

module.exports = {
  authRouter,
};
