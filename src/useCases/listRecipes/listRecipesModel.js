const { ObjectId } = require('mongodb');
const recipesCollection = require('../../database/recipesCollection');

exports.getAll = async () => {
  const collection = await recipesCollection();
  const recipes = await collection.find().toArray();
  
  return recipes;
};

exports.getById = async (id) => {
  const collection = await recipesCollection();
  const recipe = await collection.find({ _id: ObjectId(id) }).toArray();
  
  return recipe;
};
