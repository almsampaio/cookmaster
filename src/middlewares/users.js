const status = require('../api/status');

const userValidation = async (req, res, next) => {
  const { email, name, password } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email) || !email || !name || !password) {
    return res.status(status.HTTP_BAD_REQUEST).json({ message: 'Invalid entries. Try again.' });
  }
  next();
};

const adminValidation = async (req, res, next) => {
  const { role } = req.user;
  if (role !== 'admin') {
    return res.status(status.HTTP_FORBIDDEN)
    .json({ message: 'Only admins can register new admins' });
  }
  next();
};

module.exports = {
  userValidation,
  adminValidation,
};