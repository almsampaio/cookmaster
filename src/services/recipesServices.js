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

    const userIdC = ObjectId(userId);
    const recipeIdC = ObjectId(recipe.userId);
  
    if (userIdC === recipeIdC || role === 'admin') { // estou validado se o usuraio é admin
        await model.remove(recipeId);
    }
};

const upload = async (user, recipeId, img) => {
    const { _id: userId, role } = user;
    const image = `localhost:3000/src/uploads/${img}`;
    
    const recipe = await model.getById(recipeId); // busco a receita que quero atualizar
    const { name, ingredients, preparation } = recipe;

    const userIdC = ObjectId(userId);
    const recipeIdC = ObjectId(recipe.userId);
  
    if (userIdC === recipeIdC || role === 'admin') { // estou validado se o usuraio é admin
      await model.upload(recipeId, image);
      return { _id: recipeId, name, ingredients, preparation, userId, image };
    }

    await model.upload(recipeId, image);
    return { _id: recipeId, name, ingredients, preparation, userId, image };
};

module.exports = {
  update,
  remove,
  upload,
};