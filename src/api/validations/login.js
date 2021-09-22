const validEmail = (req, res, next) => {
  const { email } = req.body; 
  const re = /\S+@\S+\.\S+/;
  const regex = re.test(email);
  if (!email || email === '') {
    return res.status(401).json({ message: 'All fields must be filled' });
  }
  if (regex === false) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }
    next();
};

const validPassword = (req, res, next) => {
  const { password } = req.body;
  if (!password || password === '') {
    return res.status(401).json({ message: 'All fields must be filled' });
  }
  if (password.length < 6) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }
    next();
};
module.exports = { 
  validEmail, 
  validPassword, 
 };