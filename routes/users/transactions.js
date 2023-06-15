const express = require('express');
const { tryCatchWrapper } = require('../../helpers');
const { auth } = require('../../middlewares/auth');
const {
  addTransactionValitation,
} = require('../../middlewares/transactionValidation');
const {
  addTransactionController,
  deleteTransactionController,
} = require('../../controllers/transactions/transactionController');

const transactionsRouter = express.Router();

transactionsRouter.use(tryCatchWrapper(auth));
transactionsRouter.post(
  '/expenses',
  addTransactionValitation,
  tryCatchWrapper(addTransactionController)
);
transactionsRouter.post(
  '/income',
  addTransactionValitation,
  tryCatchWrapper(addTransactionController)
);
transactionsRouter.delete(
  '/:transactionId',
  tryCatchWrapper(deleteTransactionController)
);

module.exports = {
  transactionsRouter,
};
