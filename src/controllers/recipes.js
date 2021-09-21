const service = require('../services/recipes');

const createRecipe = async (req, res, _next) => {
  const { name, ingredients, preparation } = req.body;
  const { userId } = req.user;

  const response = await service.createRecipe({ name, ingredients, preparation, userId });
  res.status(201).json(response);
};

module.exports = { 
  createRecipe,
};
