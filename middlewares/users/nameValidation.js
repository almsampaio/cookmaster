const usersErrors = require('./usersErrors');

const { empyt } = usersErrors;

const empytName = (name) => { 
  if (!name
      || name === null
      || name === ''
      || typeof name !== 'string') { return true; }
  return false;
};

// Middleware para validação do nome
const nameValidation = async (req, res, next) => {
  const { name } = req.body;
  try {
    if (empytName(name)) throw new Error(empyt.name.message);
  } catch (error) {
    return res.status(empyt.name.code).json({ message: error.message });
  }
  next();
};

module.exports = { nameValidation };
