const usersErrors = require('./usersErrors');

const { empyt } = usersErrors;

const empytPassword = (password) => { 
  if (!password
      || password === null
      || password === ''
      || typeof password !== 'string') { return true; }
  return false;
};

// Middleware para validação do password
const passwordValidation = async (req, res, next) => {
  const { password } = req.body;
  try {
    if (empytPassword(password)) throw new Error(empyt.password.message);
  } catch (error) {
    return res.status(empyt.password.code).json({ message: error.message });
  }
  next();
};

module.exports = { passwordValidation };
