const path = require('path');
const recipesService = require('../service/recipesService');

const verifyReq = (name, ingredients, preparation) => {
  const params = [name, ingredients, preparation];
  let res = null;

  params.forEach((param) => {
    if (typeof param !== 'string') res = { message: 'Invalid entries. Try again.' };
  });

  return res;
};

const postRecipes = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { user } = req;
  const invalidEntries = verifyReq(name, ingredients, preparation);

  if (invalidEntries) {
    return res.status(400).json(invalidEntries);
  }

  const newRecipe = await recipesService.postRecipes(name, ingredients, preparation, user);
  return res.status(201).json(newRecipe);
};

const getRecipes = async (_req, res) => {
  const recipes = await recipesService.getRecipes();

  return res.status(200).json(recipes);
};

const getRecipesById = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipesService.getRecipesById(id);

  if (!recipe) {
    return res.status(404).json({ message: 'recipe not found' });
  }

  return res.status(200).json(recipe);
};

const putRecipesById = async (req, res) => {
  const { user } = req;
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const params = { name, ingredients, preparation };

  const recipeEdit = await recipesService.putRecipesById(id, params, user);

  if (recipeEdit.error) {
    return res.status(recipeEdit.error.status).json(recipeEdit.error.message);
  }

  return res.status(200).json(recipeEdit);
};

const deleteRecipesbyId = async (req, res) => {
  const { user } = req;
  const { id } = req.params;
  const del = await recipesService.deleteRecipesbyId(user, id);

  if (!del) {
    return res.status(204).end();
  }

  return del;
};

const putImage = async (req, res) => {
  const { id } = req.params;
  const { user } = req;
  const putImg = await recipesService.putImage(id, user);

  if (putImg.error) {
    return res.status(putImg.error.status).json(putImg.error.message);
  }

  return res.status(200).json(putImg);
};

const getImageById = async (req, res) => {
  const { imageId } = req.params;
  const image = path.join(__dirname, '..', 'uploads', imageId);

  return res.status(200).sendFile(image);
};

module.exports = {
  postRecipes,
  getRecipes,
  getRecipesById,
  putRecipesById,
  deleteRecipesbyId,
  putImage,
  getImageById,
};
