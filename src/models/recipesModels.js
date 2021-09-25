const connectDB = require('./connectDB');

const createRecipes = async (name, ingredients, preparation, userId) => {
  const conect = await connectDB();
  
  const { ops: newRecipe } = await conect.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });

  // console.log(newRecipe);
  return newRecipe;
 };

module.exports = {
  createRecipes,
};