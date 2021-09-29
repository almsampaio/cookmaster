const validateRecipe = async (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) {
    return { status: 400, message: 'Invalid entries. Try again.' }; 
  }
  return false;
};

const nameValidate = async (req, res, next) => {
  const { name } = req.body;
  if (!name || name === '') {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  next();
};

const ingredientsValidate = async (req, res, next) => {
  const { ingredients } = req.body;
  if (!ingredients || ingredients === '') {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  next();
};

const preparationValidate = async (req, res, next) => {
  const { preparation } = req.body;
  if (!preparation || preparation === '') {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  next();
};

module.exports = {
  validateRecipe,
  nameValidate,
  ingredientsValidate,
  preparationValidate,
};