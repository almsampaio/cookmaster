const errors = require('../errors');
const { getRecipeById } = require('../services/RecipesService');

module.exports = async (req, res, next) => {
  const { _id: userId, role } = req.user;
  const { id } = req.params;

  const recipe = await getRecipeById(id);

  console.log('User não autorizado', !userId.equals(recipe.userId) || role !== 'admin');

  if (userId.equals(recipe.userId) || role === 'admin') {
    return next();
  }
  return res.status(401).json({ message: errors.userUnauthorized });
};
