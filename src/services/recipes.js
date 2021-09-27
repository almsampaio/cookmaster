const { recipesModels } = require('../models');
const auth = require('../auth/jwtFunctions');

const create = async (token, name, ingredients, preparation) => {
  const checkToken = auth.verify(token);
  // console.log(checkToken._id); // queria fazer assim, mas o esLint não deixa :(
  const getIdUser = Object.values(checkToken)[0]; // gambiarra para trazer apenas o id do user
  const recipe = await recipesModels.create(getIdUser, name, ingredients, preparation);
  return recipe;
};

const getAll = async () => {
  const recipes = await recipesModels.getAll();
  return recipes;
};

const getOne = async (id) => {
  const recipe = await recipesModels.getOne(id);
  if (!recipe) return null;
  return recipe;
};

const update = async (id, name, ingredients, preparation) => {
  const updateRecipe = await recipesModels.update(id, name, ingredients, preparation);
  return updateRecipe;
};

const exclude = async (id) => {
  const deleteRecipe = await recipesModels.exclude(id);
  return deleteRecipe;
};

const putWithImage = async (id, image) => {
  const recipeWithImage = await recipesModels.putWithImage(id, image);
  return recipeWithImage;
};

module.exports = {
  create,
  getAll,
  getOne,
  update,
  exclude,
  putWithImage,
};
