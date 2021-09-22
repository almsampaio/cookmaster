const Recipes = require('../models/recipesModel');

const create = async (name, ingredients, preparation, userId) => (
  Recipes.create(name, ingredients, preparation, userId)
  );

const getAll = async () => Recipes.getAll();

const findById = async (id) => { 
  const recipe = await Recipes.findById(id);

  if (!recipe) {
    return {
      err: {
        code: 'invalid_data',
        message: 'recipe not found',
      },
    };
  }

  return recipe;
};

module.exports = {
  create,
  getAll,
  findById,
};
