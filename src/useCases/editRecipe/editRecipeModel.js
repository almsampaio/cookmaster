const { ObjectId } = require('mongodb');
const recipeCollection = require('../../database/recipesCollection');

const editRecipeModel = async (recipe, recipeId) => {
  const collection = await recipeCollection();
  await collection.updateOne({ _id: ObjectId(recipeId) }, { $set: recipe });
};

module.exports = editRecipeModel;
