const INTERNAL_SERVER_ERROR = 500;

const errorMiddlewares = (err, _req, res, _next) => {
  console.log(err);

  if (err.status) {
    const { status, message } = err;
    return res.status(status).json({ message });
  }

  return res.status(INTERNAL_SERVER_ERROR).json({
    code: 'internal',
    message: 'Internal server error',
  });
};

module.exports = errorMiddlewares;
