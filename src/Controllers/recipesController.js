const path = require('path');
const recipesModel = require('../Models/recipesModel');
const recipesService = require('../Services/recipesService');
const { HTTP_CREATED_STATUS, HTTP_OK_STATUS, recipeNotFound } = require('../helpers');

const createdRecipes = async (req, res) => {
 try {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;
  const createRecipe = await recipesModel.createRecipes({ name, ingredients, preparation, _id });
  return res.status(HTTP_CREATED_STATUS).json({ recipe: { ...createRecipe } });
} catch (e) {
  console.log(e);
}
};

const getAllRecipes = async (_req, res) => {
  try {
    const allRecipes = await recipesService.getAllRecipes();
    return res.status(HTTP_OK_STATUS).json(allRecipes);
  } catch (e) {
    return res.status(500).json({ message: 'Ihhhh deu erro' });
  }
};

const getRecipesId = async (req, res) => {
  try {
  const { id } = req.params;
  const validatedId = await recipesService.validateId(id);
  if (!validatedId) {
    return res.status(404).json(recipeNotFound);
  }
  return res.status(HTTP_OK_STATUS).json(validatedId);
  } catch (e) {
    return res.status(500).json({ message: 'Ihhhh deu erro' });
  }
};

const updatedRecipes = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { id } = req.params;
    const updated = await recipesService.updatedRecipe({ name, ingredients, preparation }, id);
    if (!updated) {
      return res.status(401).json({ message: 'missing auth token' });
    }

  return res.status(HTTP_OK_STATUS).json(updated);
  } catch (e) {
    console.log(e, 'Ihhhhh deu erro');
  }
};

const deletedRecipes = async (req, res) => {
  const { id } = req.params;
  const validatedId = await recipesService.validateId(id);

  if (!validatedId) {
    return res.status(401).json({ err: { code: 'invalid_data', message: 'Wrong ID format' } });
  }

  await recipesModel.deleteRecipes(id);
  res.status(204).send();
};

const updateImg = async (req, res) => {
  try {
    const { id } = req.params;
    const image = path.join('localhost:3000', 'src', 'uploads', `${id}.jpeg`);
    const recipeImg = await recipesService.updateImg(id, image);
    return res.status(200).json(recipeImg);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createdRecipes,
  getAllRecipes,
  getRecipesId,
  updatedRecipes,
  deletedRecipes,
  updateImg,
};
