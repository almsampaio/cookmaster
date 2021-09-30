const { ObjectId } = require('mongodb');
const model = require('../models/recipesModel');

const update = async (upadaterecipe, user, recipeId) => {
  const { _id: userId, role } = user;
  
  const recipe = await model.getById(recipeId); // busco a receita que quero atualizar
  
  const userIdC = ObjectId(userId);
  const recipeIdC = ObjectId(recipe.userId);
  
//   if (!recipe) return { message: 'missing auth token' };

  if (userIdC === recipeIdC || role === 'admin') { // estou validado se o usuraio é admin
    const updatedRecipe = await model.update(recipeId, upadaterecipe, userId);
    return updatedRecipe;
  }
    const updatedRecipe = await model.update(recipeId, upadaterecipe, userId);
    return updatedRecipe;
};

const remove = async (user, recipeId) => {
    const { _id: userId, role } = user;
    
    const recipe = await model.getById(recipeId); // busco a receita que quero atualizar
  
    if (userId === recipe.userId || role === 'admin') { // estou validado se o usuraio é admin
      const updatedRecipe = await model.update(recipeId);
      return updatedRecipe;
    }
    return { message: 'missing auth token' };
};

const upload = async (user, recipeId, img) => {
    const { _id: userId, role } = user;
    
    const recipe = await model.getById(recipeId); // busco a receita que quero atualizar
  
    if (userId === recipe.userId || role === 'admin') { // estou validado se o usuraio é admin
      const uploadImg = await model.upload(userId, recipeId, img, recipe);
      return uploadImg;
    }

    return { message: 'missing auth token' };
};

module.exports = {
  update,
  remove,
  upload,
};