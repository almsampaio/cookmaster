const validateEmail = (email) => {
 if (!(email.includes('@') && email.includes('.com'))) {
   return false;
 }
 return true;
};

const validateUserInfo = (name, email, password) => {
  if (!name || !email || !password) return false;
  return true;
};

const userValidation = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!validateEmail(email) || !validateUserInfo(name, email, password)) {
   return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  next();
};

module.exports = {
  userValidation,
};
