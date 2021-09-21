module.exports = (err, _req, res, _next) => {
  if (err.isJoi) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  const statusByErrorCode = {
    invalid: 400,
    notFound: 404,
    alreadyExists: 409,
  };

  const status = statusByErrorCode[err.code] || 500;

  res.status(status).json({ message: err.message });
};