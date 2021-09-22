const { ObjectId } = require('mongodb');
const recipeSchema = require('../schemas/recipes');
const recipesService = require('../services/recipes');
const { clientErrors } = require('../utils/httpStatusCodes');

const errorAuthorization = {
  statusCode: clientErrors.unauthorized, message: 'missing auth token',
};
const validateRecipePayload = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const { error } = recipeSchema.validate({ name, ingredients, preparation });
  if (error) {
    return next({ ...error, statusCode: clientErrors.badRequest });
  }
  next();
};

const validateUserRoleToAddImage = async (req, res, next) => {
  const { id } = req.params;
  const { userId, userRole } = req;

  if (!ObjectId.isValid(id)) {
    return next(errorAuthorization);
  }
  const recipe = await recipesService.getRecipeById(id);
  if (recipe.userId !== userId && userRole !== 'admin') {
    return next(errorAuthorization);
  }
  return next();
};

module.exports = { validateRecipePayload, validateUserRoleToAddImage };