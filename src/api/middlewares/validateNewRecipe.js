const validateNewRecipe = require('../schemas/recipeSchema');

const entriesMessage = 'Invalid entries. Try again.';

module.exports = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  
  const { error } = validateNewRecipe.validate({ name, ingredients, preparation });

  if (error) return next({ code: 400, message: entriesMessage });

  next();
};