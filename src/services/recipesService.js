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

const update = async (id, body, role, userId) => {
  const recipe = await Recipes.findById(id);

  if (!recipe) {
    return {
      err: {
        code: 'invalid_data',
        message: 'recipe not found',
      },
    };
  }

  return Recipes.update(id, body, role, userId);
};

const deleteInfo = async (id, role, userId) => Recipes.deleteInfo(id, role, userId);

const updateImage = async (id, image, role, userId) => Recipes.updateImage(id, image, role, userId);

module.exports = {
  create,
  getAll,
  findById,
  update,
  deleteInfo,
  updateImage,
};
