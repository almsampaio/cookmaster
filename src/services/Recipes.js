const { StatusCodes } = require('http-status-codes');
const Recipes = require('../models/Recipes');

const create = async (name, ingredients, preparation, userId) => {
  const newRecipe = await Recipes.create(name, ingredients, preparation, userId);

  return { status: StatusCodes.CREATED, data: { recipe: newRecipe } };
};

const getAll = async () => {
  const recipes = await Recipes.getAll();

  return { status: StatusCodes.OK, data: recipes };
};

const getById = async (id) => {
  const recipe = await Recipes.getById(id);

  if (!recipe) {
    return { status: StatusCodes.NOT_FOUND, message: 'recipe not found' };
  }

  return { status: StatusCodes.OK, data: recipe };
};

const update = async (id, updatedRecipe) => {
  const updateRecipe = await Recipes.update(id, updatedRecipe);

  return { status: StatusCodes.OK, data: updateRecipe };
};

const remove = async (id) => {
  const checkId = await Recipes.getById(id);

  if (!checkId) {
    return { status: StatusCodes.NOT_FOUND, message: 'Recipe ID not found' };
  }

  await Recipes.remove(id);
  return { status: StatusCodes.NO_CONTENT };
};

const uploadFile = async (id, fileName) => {
  const imageName = `localhost:3000/src/uploads/${fileName}`;
  const uploadedFile = await Recipes.uploadFile(id, imageName);
  return { status: StatusCodes.OK, data: uploadedFile };
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
  uploadFile,
};