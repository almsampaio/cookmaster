const Joi = require('joi');
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

module.exports = {
  create,
  getAll,
};