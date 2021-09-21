const recipesModels = require('../models/recipesModels');

const postRecipes = async (name, ingredients, preparation, user) => {
  const { _id } = user;
  const userId = _id;

  const newRecipe = await recipesModels.postRecipes(name, ingredients, preparation, userId);

  return {
    recipe: newRecipe,
  };
};

const getRecipes = async () => recipesModels.getRecipes();

const getRecipesById = async (id) => recipesModels.getRecipesById(id);

const verifyPermission = async (user, id) => {
  const recipeID = await getRecipesById(id);
  const { _id, role } = user;

  if (!recipeID) {
    return { error: { status: 404, message: 'Recipe not found' } };
  }

  const userId = recipeID.userId.toString();
  // console.log(typeof userId);

  if (userId === _id.toString() || role === 'admin') {
    return null;
  }

  return {
    error: { status: 401, message: 'Permission denied!' },
  };
};

const putRecipesById = async (id, params, user) => {
  const { name, ingredients, preparation } = params;
  const invalidUser = await verifyPermission(user, id);

  if (invalidUser) {
    return invalidUser;
  }

  return recipesModels.putRecipesById(id, name, ingredients, preparation);
};

const deleteRecipesbyId = async (user, id) => {
  const invalidUser = await verifyPermission(user, id);

  if (invalidUser) {
    return invalidUser;
  }

  return recipesModels.deleteRecipesbyId(id);
};

const putImage = async (id, user) => {
  const invalidUser = await verifyPermission(user, id);

  if (invalidUser) {
    return invalidUser;
  }

  const { _id: recipeId } = await getRecipesById(id);
  const imageName = `${recipeId}.jpeg`;

  return recipesModels.putImage(id, imageName);
};

module.exports = {
  postRecipes,
  getRecipes,
  getRecipesById,
  putRecipesById,
  deleteRecipesbyId,
  putImage,
};
