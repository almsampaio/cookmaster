const model = require('../models/Recipes');
const { OK, NOT_FOUND } = require('./Status');

const recipById = async (req, res) => {
  const { id } = req.params;
  const recipe = await model.findRecipe(id);
  if (!recipe) return res.status(NOT_FOUND).json({ message: 'recipe not found' });

  res.status(OK).json(recipe);
};

module.exports = {
  recipById,
};
