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

module.exports = {
  create,
  getAll,
};
