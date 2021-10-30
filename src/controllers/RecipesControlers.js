const { ObjectId } = require('mongodb');
const service = require('../services/RecipesService');
const model = require('../models/RecipesModel');
const { HTTP_CREATED } = require('../utils/utils');

const createRecipe = async (req, res) => {
  const { error, status, message } = await service.createRecipes(req.body);
  if (error) return res.status(status).json({ message });

  const { _id } = req.user;
  const { name, ingredients, preparation } = req.body;

  const newRecipe = await model.createRecipe(name, ingredients, preparation);

  const recipe = {
    ...newRecipe,
    userId: ObjectId(_id),
  };

  return res.status(HTTP_CREATED).json({ recipe });
};

module.exports = {
  createRecipe,
};
