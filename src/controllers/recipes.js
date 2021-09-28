const serviceRecipes = require('../services/recipes');

const createRecipes = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const token = req.headers.authorization;
  
  const recipe = await serviceRecipes.createRecipes(name, ingredients, preparation, token);
  if (recipe.errorCode) return res.status(recipe.errorCode).json(recipe.errorInfo);
  return res.status(201).json(recipe);
};

const getRecipes = async (req, res) => {
  const recipes = await serviceRecipes.getRecipes();
  return res.status(200).json(recipes);
};

const getRecipesById = async (req, res) => {
  const { id } = req.params;
  const recipe = await serviceRecipes.getRecipesById(id);
  if (recipe.errorCode) return res.status(recipe.errorCode).json(recipe.errorInfo);
  return res.status(recipe.code).json(recipe.recipeInfo);
};

const updateRecipe = async (req, res) => {
const { id } = req.params;
const token = req.headers.authorization;
const { name, ingredients, preparation } = req.body;
const bodyInfos = { name, ingredients, preparation };
// console.log(token);

const updatedRecipe = await serviceRecipes.updateRecipe(id, token, bodyInfos);

if (updatedRecipe.errorCode) {
  return res.status(updatedRecipe.errorCode).json(updatedRecipe.errorInfo);
}

return res.status(updatedRecipe.code).json(updatedRecipe.recipe);
};

const removeRecipe = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization;

  const removedRecipe = await serviceRecipes.removeRecipe(id, token);
  if (removedRecipe.errorCode) {
 return res.status(removedRecipe.errorCode)
  .json(removedRecipe.errorInfo); 
}
  res.status(removedRecipe.code).end();
};

module.exports = {
  createRecipes,
  getRecipes,
  getRecipesById,
  updateRecipe,
  removeRecipe,
};
