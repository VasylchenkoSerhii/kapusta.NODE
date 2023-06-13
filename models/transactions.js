const mongoose = require('mongoose');

const schema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, 'userId is required'],
    },
    dateTransaction: {
      type: Date,
      required: [true, 'date transaction is required'],
    },
    income: {
      type: Boolean,
      required: [true, 'income is required'],
    },
    sum: {
      type: Number,
      required: [true, 'sum is required'],
    },
    category: {
      type: String,
      required: [true, 'category is required'],
    },
    description: {
      type: String,
      required: [true, 'description is required'],
    },
  },
  { versionKey: false, timestamps: true }
);

const Transactions = mongoose.model('transaction', schema);

module.exports = {
  Transactions,
};
