const { ObjectId } = require('mongodb');
const recipeCollection = require('../../database/recipesCollection');

const deleteRecipeModel = async (recipeId) => {
  const collection = await recipeCollection();
  await collection.deleteOne({ _id: ObjectId(recipeId) });
};

module.exports = deleteRecipeModel;
