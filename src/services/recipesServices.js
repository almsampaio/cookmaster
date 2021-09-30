const model = require('../models/userModel');

const update = async (upadaterecipe, user, recipeId) => {
  const { _id: userId, role } = user;
  
  const recipe = await model.getById(recipeId); // busco a receita que quero atualizar

  if (recipe === null) return { message: 'recipe not found' };

  if (recipe === false) return { message: 'missing auth token' };
  
//   if (!recipe) return { message: 'missing auth token' };

  if (userId === recipe.userId || role === 'admin') { // estou validado se o usuraio é admin
    const updatedRecipe = await model.update(recipeId, upadaterecipe, userId);
    return updatedRecipe;
  }
  return { message: 'missing auth token' };
};

module.exports = {
  update,
};