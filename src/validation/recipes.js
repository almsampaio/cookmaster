const fields = (recipe) => {
  if (!recipe.name || !recipe.ingredients || !recipe.preparation) {
    const err = { status: 400, message: 'Invalid entries. Try again.' };
    throw err;
  }
  return null;
};

const invalidRecipe = (result) => {
  if (!result) {
    const err = { status: 404, message: 'recipe not found' };
    throw err;
  }
  return null;
};

module.exports = {
  fields,
  invalidRecipe,
};