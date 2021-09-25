const nameValidator = async (name) => {
  if (!name) return false;
  return true;
};

const ingredientsValidator = async (ingredients) => {
  if (!ingredients) return false;
  return true;
};

const preparationValidator = async (preparation) => {
  if (!preparation) return false;
  return true;
};

const recipeValidator = async (name, ingredients, preparation) => {
  const checkName = await nameValidator(name);
  const checkIngredients = await ingredientsValidator(ingredients);
  const checkPreparation = await preparationValidator(preparation);

  if (!checkName || !checkIngredients || !checkPreparation) {
    return {
      error: true,
      message: 'Invalid entries. Try again.',
      status: 400,
    };
  }
  return true;
};

module.exports = {
  recipeValidator,
};