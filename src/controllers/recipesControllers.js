const recipesService = require('../services/recipesService');
const recipesModel = require('../models/recipesModel');

const getRecipes = async (_req, res) => {
  const recipes = await recipesService.getRecipes();
  res.status(200).json(recipes);
};

const getRecipeById = async (req, res) => {
  const recipe = await recipesService.getRecipeById(req.params.id);
  if (!recipe) {
    return res.status(404).json({ message: 'recipe not found' });
  }
  res.status(200).json(recipe);
};

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const userID = req.user;
  const create = await recipesService.createRecipe(name, ingredients, preparation, userID);
  return res.status(201).json(create);
};

// const updateRecipe = async (req, res) => {
//   const { id } = req.params;
//   const { name, ingredients, preparation } = req.body;
//   try {
//     const recipe = await recipesService.updateRecipe(
//       id,
//       name,
//       ingredients,
//       preparation,
      
//     );
//     if (recipe.err) {
//       return res
//         .status(recipe.err.status)
//         .json({ message: recipe.err.message });
//     }

//     res.status(200).json(recipe);
//   } catch (error) {
//     console.error(error);
//   }
// };

const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { _id, role } = req.user;
  const update = req.body;
  const recipe = await recipesModel.updateRecipe(id, update, role, _id);
  if (recipe === null) return res.status(404).json({ message: 'recipe not found' });
  if (recipe === false) return res.status(401).json({ message: 'missing auth token' });
  return res.status(200).json(recipe);
};

module.exports = {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
};