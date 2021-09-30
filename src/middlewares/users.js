const status = require('../api/status');

const userValidation = async (req, res, next) => {
  const { email, name, password } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email) || !email || !name || !password) {
    return res.status(status.HTTP_BAD_REQUEST).json({ message: 'Invalid entries. Try again.' });
  }
  next();
};

module.exports = {
  userValidation,
};