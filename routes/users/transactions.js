const express = require('express');
const { tryCatchWrapper } = require('../../helpers');
const { auth } = require('../../middlewares/auth');
const {
  addTransactionValitation,
  addIdValitation,
} = require('../../middlewares/transactionValidation');
const {
  addTransactionController,
  deleteTransactionController,
  getAllTransactionsController,
} = require('../../controllers/transactions/transactionController');

const transactionsRouter = express.Router();

transactionsRouter.use(tryCatchWrapper(auth));
transactionsRouter.get('/', tryCatchWrapper(getAllTransactionsController));
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
  addIdValitation,
  tryCatchWrapper(deleteTransactionController)
);

module.exports = {
  transactionsRouter,
};
