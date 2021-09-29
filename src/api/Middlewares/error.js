module.exports = ({ statusCode, error }, _req, res, _next) =>
  res.status(statusCode).json(error);
