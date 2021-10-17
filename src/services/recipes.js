const RecipesModels = require('../models/recipes');
const validation = require('../utils/validation');

const create = async (nameRecipe, ingredientsRecipe, preparationRecipe, user) => {
  const validate = validation
    .validateEntriesRecipes(nameRecipe, ingredientsRecipe, preparationRecipe);
  if (validate) return validate;

  const result = await RecipesModels.create(nameRecipe, ingredientsRecipe, preparationRecipe, user);
  const newRecipe = result.ops[0];
  const { name, ingredients, preparation, _id, userId } = newRecipe;
  return { recipe: { name, ingredients, preparation, _id, userId } };
};

module.exports = {
  create,
};
