const express = require('express');
const { tryCatchWrapper } = require('../../helpers');
const { auth } = require('../../middlewares/auth');
const {
  addTransactionValitation,
  addIdValitation,
  mothsResultsValidation,
} = require('../../middlewares/transactionValidation');
const {
  addTransactionController,
  deleteTransactionController,
  getAllTransactionsController,
} = require('../../controllers/transactions/transactionController');
const {
  incomeMonths,
  expensesMonths,
  fullStatistics,
} = require('../../controllers/transactions/date');

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
transactionsRouter.post(
  '/incomeMonths',
  mothsResultsValidation,
  tryCatchWrapper(incomeMonths)
);
transactionsRouter.post(
  '/expensesMonths',
  mothsResultsValidation,
  tryCatchWrapper(expensesMonths)
);

transactionsRouter.post(
  '/fullStatistics',
  mothsResultsValidation,
  tryCatchWrapper(fullStatistics)
);

module.exports = {
  transactionsRouter,
};
