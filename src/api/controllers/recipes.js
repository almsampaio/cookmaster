const recipesServices = require('../services/recipes');

const createRecipes = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const CreateRecipes = await recipesServices.createRecipes({ name, ingredients, preparation });
  
  if (CreateRecipes.error) return next(CreateRecipes);

  res.status(201).json(CreateRecipes);
};

module.exports = {
  createRecipes,
};