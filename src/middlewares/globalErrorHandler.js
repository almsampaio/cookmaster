const AppError = require('../helpers/appError');

module.exports = function globalErrorHandler(err, req, res, _) {
    if (err && err instanceof AppError) {
      return res.status(err.statusCode).json({ message: err.message });
    }
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
};
