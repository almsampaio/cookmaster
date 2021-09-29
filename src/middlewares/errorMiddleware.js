const errorMiddleware = (err, _req, res, _next) => {
  const { status, message } = err;
  console.log({ errorMiddleware: `ran one error status: ${status} and message: ${message}` });

  return res.status(status).json({ message });
};

module.exports = {
  errorMiddleware,
};
