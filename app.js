const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const { authRouter } = require('./routes/users/auth');

const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
// app.use('/public', express.static('public'));

app.use('/users', authRouter);

app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: err.message,
    });
  }
  if (err.kind === 'ObjectId') {
    return res.status(404).json({
      message: 'Not found',
    });
  }
  if (err.code === 403) {
    return res.status(403).json({
      message: err.message,
    });
  }
  res
    .status(err.status || 500)
    .json({ message: err.message || 'Internal server error' });
});

module.exports = {
  app,
};
