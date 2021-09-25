const rescue = require('express-rescue');

const {
  STATUS_OK,
  STATUS_CREATE,
  // STATUS_BAD_REQUEST,
  STATUS_UNAUTHORIZED,
  STATUS_NOT_FOUND,
  STATUS_UNPROCESSABLE,
  // STATUS_CONFLICT,
  STATUS_NO_CONTENT,
} = require('../utils/httpStatus');

const { serviceCreateRecipe,
  getAllRecipes,
  findRecipeById,
  serviceEditRecipe,
  serviceDeleteRecipe } = require('../services/recipesServices');

const createRecipe = rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;
  const createdRecipe = await serviceCreateRecipe({ name, ingredients, preparation, userId });
  const { _id } = createdRecipe;
  console.log(`id da receita:${_id}`);
  if (createdRecipe) {
    return res.status(STATUS_CREATE).json({ recipe: createdRecipe });
  }
  return res.status(STATUS_UNAUTHORIZED).json({ message: 'Unknown error.' });
});

const listRecipes = async (_req, res) => {
  const recipes = await getAllRecipes();
  if (recipes) {
    return res.status(STATUS_OK).json(recipes);
  }
  return res.status(STATUS_UNPROCESSABLE).json({ message: 'Recipes not found' });
};

const recipeDetails = async (req, res) => {
  const { id } = req.params;
  const recipe = await findRecipeById(id);
  if (recipe) {
    return res.status(STATUS_OK).json(recipe);
  }
  return res.status(STATUS_NOT_FOUND).json({ message: 'recipe not found' });
};

const editRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { id } = req.params;
  const { _id: userId } = req.user;
  // console.log(req.user);
  const updatedRecipe = await serviceEditRecipe({ name, ingredients, preparation, id, userId });
  return res.status(STATUS_OK).json(updatedRecipe);
};

const deleteRecipe = async (req, res) => {
  console.log('controller delete chamado!');
  const { id } = req.params;
  const deletedRecipe = await serviceDeleteRecipe(id);
  if (deletedRecipe) {
    console.log(`receitaDeletada: ${deletedRecipe}`);
    return res.status(STATUS_NO_CONTENT).send();
  }
  return res.status(STATUS_UNAUTHORIZED).json({ message: 'Unknown error.' });
};
module.exports = {
  createRecipe,
  listRecipes,
  recipeDetails,
  editRecipe,
  deleteRecipe,
};