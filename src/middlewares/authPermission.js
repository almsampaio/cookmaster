const GetRecipeByIdService = require('../services/recipes/GetRecipeByIdService');

const authPermission = async (req, _res, next) => {
  const { role, id: tokenId } = req.token;

  const { id } = req.params;

  const isAdmin = role === 'admin';

  if (isAdmin) return next();

  const getRecipeByIdService = new GetRecipeByIdService(id);

  const recipeById = await getRecipeByIdService.handle();

  if (recipeById.isError) return next(recipeById);

  const equalId = tokenId === recipeById.userId;

  if (equalId) return next();

  const err = { code: 401, isError: true, message: 'Invalid token' };

  next(err);
};

module.exports = authPermission;
