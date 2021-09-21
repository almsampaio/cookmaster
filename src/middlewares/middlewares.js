const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'Invalid entries. Try again.' });
  next();
};

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const reg = /\S+@\S+\.\S+/;
  if (!email || !reg.test(email)) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) return res.status(400).json({ message: 'Invalid entries. Try again.' });
  next();
};

module.exports = {
  validateName,
  validateEmail,
  validatePassword,
};
