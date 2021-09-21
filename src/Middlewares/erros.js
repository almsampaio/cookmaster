const handleErrors = (err, _req, res, _next) => {
  if (err.isJoi) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  return res.status(err.code).json({ message: err.message });
};

module.exports = {
  handleErrors,
};
