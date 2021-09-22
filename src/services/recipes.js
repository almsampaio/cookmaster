const recipeModels = require('../models/recipes');

const editRecipe = async (id, data, userId, role) => {
  const check = await recipeModels.listRecipeById(id);
  if (check.userId !== userId && role !== 'admin') {
    return {
      error: {
        code: 'unauthorized',
        message: 'You dont have permission to do that',
      },
    };
  }
  
  const result = await recipeModels.editRecipe(id, data);
  return result;
};

module.exports = {
  editRecipe,
};
