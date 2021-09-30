const validateName = (req, res, next) => {
  const { name } = req.body;

  if (!name || name === '') {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  next();
};

const validateEmail = (req, res, next) => {
  const { email } = req.body;

  function EmailIsValid(emailvalid) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailvalid);
  }

  const valid = EmailIsValid(email); // retorna true or false

  if (!email || email === '') {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  if (!valid) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  
  if (!password) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  next();
};

module.exports = { 
  validateName, 
  validateEmail,
  validatePassword,
};