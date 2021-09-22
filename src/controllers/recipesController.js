const recipesService = require('../services/recipesService');

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.payload;
  const userID = _id;
  const { error, recipe } = await recipesService
    .createRecipe(name, ingredients, preparation, userID);
  if (error) {
    return res.status(error.status).json({ message: error.message });
  }
  return res.status(201).json({ recipe });
};

module.exports = {
  createRecipe,
};
