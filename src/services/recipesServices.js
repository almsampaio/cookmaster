const recipesModel = require('../model/recipesModel');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const recipe = await recipesModel.createRecipe(name, ingredients, preparation, userId);
  return recipe;
};

const getAllRecipes = async () => {
  const recipes = await recipesModel.getAllRecipes();
  return recipes;
};

const getById = async (id) => {
  const recipe = await recipesModel.getById(id);
  return recipe;
};

const recipesUpdate = async (name, ingredients, preparation, id) => {
  await recipesModel.updateRecipe(name, ingredients, preparation, id);
  const recipe = await recipesModel.getById(id);
  return recipe;
};

const deleteById = async (id) => {
  const deletedOne = await recipesModel.deleteById(id);
  return deletedOne;
};

const addImg = async (id, img) => {
  const imgUrl = `localhost:3000/src/uploads/${img}`;
  await recipesModel.addImg(imgUrl, id);
  const recipe = await recipesModel.getById(id);
  return recipe;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getById,
  recipesUpdate,
  deleteById,
  addImg,
};
