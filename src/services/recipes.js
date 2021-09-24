const { ObjectId } = require('mongodb');
const Schema = require('../utils/schema');
const Recipes = require('../models/recipes');
const { URL } = require('../data');

const create = async (data, userId) => {
  const { error } = Schema.schemaRecipes.validate(data);
  if (error) return { status: 400, err: { message: 'Invalid entries. Try again.' } };

  const recipe = await Recipes.create(data, userId);
  return { status: 201, data: { recipe } };
};

const getAll = async () => {
  const recipes = await Recipes.getAll();
  return { status: 200, data: recipes };
};

const getById = async (id) => {
  const checkedId = ObjectId.isValid(id);
  if (!checkedId) return { status: 404, err: { message: 'recipe not found' } };

  const recipe = await Recipes.getById(id);
  return { status: 200, data: recipe };
};

const update = async (id, data, userId) => {
  const checkedId = ObjectId.isValid(id);
  if (!checkedId) return { status: 404, err: { message: 'recipe not found' } };

  const recipe = await Recipes.update(id, data, userId);
  return { status: 200, data: recipe };
};

const remove = async (id) => {
  const checkedId = ObjectId.isValid(id);
  if (!checkedId) return { status: 404, err: { message: 'recipe not found' } };

  await Recipes.remove(id);
  return { status: 204 };
};

const updateFile = async (id, filename) => {
  const checkedId = ObjectId.isValid(id);
  if (!checkedId) return { status: 404, err: { message: 'recipe not found' } };

  const image = `${URL}/src/uploads/${filename}`;
  const result = await Recipes.updateFile(id, image);

  return { status: 200, data: result };
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
  updateFile,
};