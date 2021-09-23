const recipeService = require('../service/recipeService');

const create = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;
  const { data } = await recipeService.create(name, ingredients, preparation, userId);
  
  return res.status(201).json({ recipe: data });
};

module.exports = {
  create,
};
