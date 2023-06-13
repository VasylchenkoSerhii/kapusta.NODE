const express = require('express');
const { HttpError } = require('../../helpers');
const { auth } = require('../../middlewares/auth');
const {
  addTransactionValitation,
} = require('../../middlewares/transactionValidation');
const {
  addTransactionController,
  deleteTransactionController,
} = require('../../controllers/transactions/transactionController');

const transactionsRouter = express.Router();

transactionsRouter.use(HttpError(auth));
transactionsRouter.post(
  '/expenses',
  addTransactionValitation,
  HttpError(addTransactionController)
);
transactionsRouter.post(
  '/income',
  addTransactionValitation,
  HttpError(addTransactionController)
);
transactionsRouter.delete(
  '/:transactionId',
  HttpError(deleteTransactionController)
);
