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

const deleteRecipe = async (id, userId, role) => {
  const check = await recipeModels.listRecipeById(id);
  if (check.userId !== userId && role !== 'admin') {
    return {
      error: {
        code: 'unauthorized',
        message: 'You dont have permission to do that',
      },
    };
  }

  const result = await recipeModels.deleteRecipe(id);
  return result;
};

const addImg = async (id, userId, role, filename) => {
  const check = await recipeModels.listRecipeById(id);
  if (check.userId !== userId && role !== 'admin') {
    return {
      error: {
        code: 'unauthorized',
        message: 'You dont have permission to do that',
      },
    };
  }
  const imagePath = `localhost:3000/src/uploads/${filename}`;
  const result = await recipeModels.addImg(id, imagePath);
  return result;
};

module.exports = {
  editRecipe,
  deleteRecipe,
  addImg,
};
