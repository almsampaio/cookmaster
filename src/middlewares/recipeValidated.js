const isValidRecipe = require('./validations/isValidRecipe');

const recipeValidated = (req, res, next) => {
  const data = req.body;
  const response = isValidRecipe(data);
  if (response) return res.status(response.status).json({ message: response.message });
  next();
};

module.exports = recipeValidated;