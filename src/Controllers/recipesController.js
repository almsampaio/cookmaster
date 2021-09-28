const recipesModel = require('../Models/recipesModel');
const recipesService = require('../Services/recipesService');
const { HTTP_CREATED_STATUS, HTTP_OK_STATUS, recipeNotFound } = require('../helpers');

const createdRecipes = async (req, res) => {
 try {
  const { name, ingredients, preparation } = req.body;
  const createRecipe = await recipesModel.createRecipes({ name, ingredients, preparation });
  return res.status(HTTP_CREATED_STATUS).json({ recipe: { ...createRecipe } });
} catch (e) {
  console.log(e);
}
};

const getAllRecipes = async (_req, res) => {
  try {
    const allRecipes = await recipesService.getAllRecipes();
    console.log(allRecipes);
    return res.status(HTTP_OK_STATUS).json(allRecipes);
  } catch (e) {
    return res.status(500).json({ message: 'Ihhhh deu erro' });
  }
};

const getRecipesId = async (req, res) => {
  try {
  const { id } = req.params;
  const validatedId = await recipesService.validateId(id);
  console.log(validatedId);
  if (!validatedId) {
    return res.status(404).json(recipeNotFound);
  }
  return res.status(HTTP_OK_STATUS).json(validatedId);
  } catch (e) {
    return res.status(500).json({ message: 'Ihhhh deu erro' });
  }
};

module.exports = {
  createdRecipes,
  getAllRecipes,
  getRecipesId,
};
