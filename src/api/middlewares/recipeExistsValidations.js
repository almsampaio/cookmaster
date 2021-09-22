const { findById } = require('../models/recipesModel');

async function recipeExists(req, res, next) {
  const { id } = req.params;

  const recipe = await findById(id);

  if (!recipe) {
    return res.status(404).json({ message: 'recipe not found' });
  }

  next();
}

module.exports = recipeExists;