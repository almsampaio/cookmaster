const recipeService = require('../services/recipeService');

const HTTP_CREATED_STATUS = 201;

module.exports = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { user } = req;

  const id = '_id';
  const userId = user[id];

  const response = await recipeService.insertRecipe(name, ingredients, preparation, userId);

  if (response.code) {
    return res.status(response.code).json({
        message: response.message,
    });
}

  return res.status(HTTP_CREATED_STATUS).json({ recipe: response });
};