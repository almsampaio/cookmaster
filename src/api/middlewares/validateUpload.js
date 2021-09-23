const recipeService = require('../services/recipeService');

const validateUpload = async (req, _res, next) => {
  const { id } = req.params;
  const { userId } = req;
  const authorizedUser = await recipeService.verifyIfUserHaveAuthorizationToEdit(id, userId);

  if (!authorizedUser) next({ error: true });

  next();
};

module.exports = { validateUpload };