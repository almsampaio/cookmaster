const validEmail = (req, res, next) => {
  const { email } = req.body; 
  const re = /\S+@\S+\.\S+/;
  const regex = re.test(email);
  if (!email || email === '') {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  if (regex === false) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
    next();
};

const validPassword = (req, res, next) => {
  const { password } = req.body;
  if (!password || password === '') {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
    next();
};
const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name || name === '') {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  next(); 
};
module.exports = { 
  validEmail, 
  validPassword, 
  validateName, 
 };