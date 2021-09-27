const { ObjectId } = require('mongodb');
const recipeCollection = require('../../database/recipesCollection');

const insertImagePath = async (recipeId) => {
  const collection = await recipeCollection();
  const recipe = await collection.aggregate([
    { $match: { _id: ObjectId(recipeId) } },
    { $addFields: {
      image: { $concat: ['localhost:3000/src/uploads/', recipeId, '.jpeg'] },
    } },
  ]).toArray();
  
  return recipe;
};

const createRecipeModel = async (recipe) => {
  const collection = await recipeCollection();
  const { ops: [{ _id }] } = await collection.insertOne(recipe);
  const createdRecipe = await insertImagePath(_id.toString());

  return createdRecipe;
};

module.exports = createRecipeModel;
