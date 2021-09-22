const recipesModel = require('../Models/recipesModel');
const { recipesValidations } = require('../helpers/recipesValidations');

const HTTP_STATUS_CREATED = 201;
const HTTP_STATUS_OK = 200;
const HTTP_STATUS_NOT_FOUND = 404;
const HTTP_STATUS_UNAUTHORIZED = 401;
const ERROR_MESSAGE = 'recipe not found';
const ERROR_TOKEN = 'jwt malformed';

const getAllRecipes = async () => {
  const recipes = await recipesModel.getAllRecipes();

  return ({
    code: HTTP_STATUS_OK,
    recipes,
  });
};

const getRecipeById = async (id) => {
  const recipe = await recipesModel.getRecipeById(id);

  if (!recipe) {
    return ({
      code: HTTP_STATUS_NOT_FOUND,
      message: ERROR_MESSAGE,
    });
  }
  return ({
    code: HTTP_STATUS_OK,
    recipe,
  });
};

const addRecipes = async (name, ingredients, preparation, userId) => {
  const validate = recipesValidations(name, ingredients, preparation);

  if (validate) {
    return validate;
  }

  const recipe = await recipesModel.addURecipes(
    name, ingredients, preparation, userId,
  );

  return ({
    code: HTTP_STATUS_CREATED,
    recipe,
  });
};

const updateRecipe = async (recipeToUpdateParameters) => {
  const { id, userId, role } = recipeToUpdateParameters;
  const recipeOwner = await recipesModel.checkRecipeOwner(id, userId);
  if (recipeOwner || role === 'admin') {
    const recipe = await recipesModel.updateRecipe(recipeToUpdateParameters);
    return ({
      code: HTTP_STATUS_OK,
      recipe,
    });
  }
  return ({
    code: HTTP_STATUS_UNAUTHORIZED,
    message: ERROR_TOKEN,
  });
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  addRecipes,
  updateRecipe,
};
