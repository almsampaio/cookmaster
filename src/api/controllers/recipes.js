const recipesServices = require('../services/recipes');

const createRecipes = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const token = req.headers.authorization;
  const CreateRecipes = await recipesServices
    .createRecipes({ name, ingredients, preparation }, token);
  
  if (CreateRecipes.error) return next(CreateRecipes);

  res.status(201).json(CreateRecipes);
};

module.exports = {
  createRecipes,
};