const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name || name === '') {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  next(); 
};

const validateIngredients = (req, res, next) => {
  const { ingredients } = req.body;
  if (!ingredients || ingredients === '') {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  next(); 
};
const validatePreparation = (req, res, next) => {
  const { preparation } = req.body;
  if (!preparation || preparation === '') {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  next(); 
};

module.exports = { 
  validateIngredients, 
  validatePreparation, 
  validateName, 
 };