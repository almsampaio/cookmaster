const Joi = require('joi');
const { ObjectId } = require('mongodb');
const Recipes = require('../models/recipes');

const schemaRecipes = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
});

const create = async (data, userId) => {
  const { error } = schemaRecipes.validate(data);
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

  const image = `localhost:3000/src/uploads/${filename}`;
  await Recipes.updateFile(id, image);
  const recipe = await Recipes.getById(id);

  return { status: 200, data: recipe };
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
  updateFile,
};