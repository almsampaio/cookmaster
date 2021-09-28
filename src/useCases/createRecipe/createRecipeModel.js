const { ObjectId } = require('mongodb');
const recipeCollection = require('../../database/recipesCollection');

const insertImagePath = async (recipeId) => {
  const collection = await recipeCollection();
  const image = `localhost:3000/src/uploads/${recipeId}.jpeg`;
  await collection.updateOne({ _id: ObjectId(recipeId) }, { $set: { image } });
};

const createRecipeModel = async (recipe) => {
  const collection = await recipeCollection();
  const { ops: [createdRecipe] } = await collection.insertOne(recipe);
  const { _id } = createdRecipe;
  await insertImagePath(_id.toString());

  return createdRecipe;
};

module.exports = createRecipeModel;
