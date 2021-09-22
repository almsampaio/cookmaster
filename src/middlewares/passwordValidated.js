const isValidPassword = require('./validations/isValidPassword');

const passwordValidated = (req, res, next) => {
  const { password } = req.body;
  const response = isValidPassword(password);
  if (response) return res.status(response.status).json({ message: response.message });
  next();
};

module.exports = passwordValidated;