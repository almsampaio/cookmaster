const AppError = require('../utils/AppError');

module.exports = (err, _req, res, _next) => {
  console.log(err);
  if (err instanceof AppError) {
    return res.status(err.code).json({ message: err.message });
  }

  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ message: 'jwt malformed' });
  }

  res.status(500).json({ message: 'Something went wrong!' });
};
