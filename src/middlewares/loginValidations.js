const validateEmail = (req, res, next) => {
    const { email } = req.body;
  
    function EmailIsValid(emailvalid) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailvalid);
    }
  
    const valid = EmailIsValid(email); // retorna true or false
  
    if (!email || email === '') {
      return res.status(401).json({ message: 'All fields must be filled' });
    }
  
    if (!valid) {
      return res.status(401).json({ message: 'Incorrect username or password' });
    }
  
    next();
  };
  
  const validatePassword = (req, res, next) => {
    const { password } = req.body;
    
    if (!password) {
      return res.status(401).json({ message: 'All fields must be filled' });
    }
  
    next();
  };
  
  module.exports = { 
    validateEmail,
    validatePassword,
  };