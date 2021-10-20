const SERVER_ERROR_MESSAGE = 'Internal server error';
const STATUS = 500;

/**
 * Module that exports the correct message according the given status
 */
 const errorMiddleware = (err, _req, res, _next) => {
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }

  return res.status(STATUS).json({
    error: {
      message: SERVER_ERROR_MESSAGE,
    },
  });
};

module.exports = errorMiddleware; 