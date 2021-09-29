const usersErrors = require('./recipesErrors');

const { empyt } = usersErrors;

const empytField = (field) => { 
  if (!field
      || field === null
      || field === ''
      || typeof field !== 'string') { return true; }
  return false;
};

// Middleware para verificar se os campos estão preenchidos
const emptyFildValidation = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  try {
    if (
         empytField(name)
      || empytField(ingredients)
      || empytField(preparation)
    ) { throw new Error(empyt.message); }
  } catch (error) {
    return res.status(empyt.code).json({ message: error.message });
  }
  next();
};

module.exports = { emptyFildValidation };
