module.exports = (err, _req, res, _next) => {
  const statusByErrorCode = {
    badRequest: 400,
    unauthorized: 401,
    notFound: 404,
    conflict: 409,
  };

  const status = statusByErrorCode[err.code] || 500;

  res.status(status).json({ message: err.message });
};