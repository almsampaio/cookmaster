const {
  HTTP_CREATED,
} = require('../../schemas/status');

const {
  createServices,
} = require('../../services/recipes/recipesService');

const createController = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.userRecipes;

  const { data } = await createServices(name, ingredients, preparation, userId);

  return res.status(HTTP_CREATED).json({
    recipe: data,
  });
};

module.exports = {
  createController,
};