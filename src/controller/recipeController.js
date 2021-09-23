const { ObjectId } = require('mongodb');
const recipeService = require('../service/recipeService');

const create = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;
  const { data } = await recipeService.create(name, ingredients, preparation, userId);
  
  return res.status(201).json({ recipe: data });
};

const getAll = async (req, res) => {
  const recipes = await recipeService.getAll();
  
  return res.status(200).json(recipes);
};

const getById = async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) return res.status(404).json({ message: 'recipe not found' });

  const recipe = await recipeService.getById(id);

  return res.status(200).json(recipe);
};

module.exports = {
  create,
  getAll,
  getById,
};
