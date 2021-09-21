const error = (err, _req, res, _next) => {
  const { error: { code, message } } = err;
  return res.status(code).json({ message });
};

module.exports = {
  error,
};
