const error = (err, _req, res, _next) => {
  if (!err.details) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  return res.status(err.statusCode).json({ message: err.details[0].message });
};

module.exports = error;