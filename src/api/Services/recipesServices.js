const recipesModel = require('../Models/recipesModel');
const { recipesValidations } = require('../helpers/recipesValidations');

const HTTP_STATUS_CREATED = 201;
const HTTP_STATUS_OK = 200;

const getAllRecipes = async () => {
  const recipes = await recipesModel.getAllRecipes();

  return ({
    code: HTTP_STATUS_OK,
    recipes,
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

module.exports = {
  getAllRecipes,
  addRecipes,
};
