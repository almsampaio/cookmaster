const errorMiddleware = (err, _req, res, _next) => {
  console.log(err);

  return res.status(err.code).json({ message: err.message });
};

module.exports = errorMiddleware;