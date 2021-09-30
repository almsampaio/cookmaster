const status = require('../api/status');

const recipeCreateValidation = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) {
    return res.status(status.HTTP_BAD_REQUEST).json({ message: 'Invalid entries. Try again.' });
  }
  next();
};

module.exports = {
  recipeCreateValidation,
};