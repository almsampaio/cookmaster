const { ObjectId } = require('mongodb');

const mongoConnection = require('./connection');

const getAllRecipes = async () => {
  const connection = await mongoConnection();
  const result = await connection.collection('recipes').find({}).toArray();

  return result;
};

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const connection = await mongoConnection();
  const result = await connection.collection('recipes').findOne(ObjectId(id));
  return result;
};

const createRecipe = async (recipe, userId) => {
  const { name, ingredients, preparation } = recipe;
  
  const connection = await mongoConnection();
  const result = await connection.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });

    return { _id: result.insertedId, name, ingredients, preparation, userId };
};

const updateRecipe = async (id, name, ingredients, preparation) => {
  const connection = await mongoConnection();
  await connection.collection('recipes').updateOne({ _id: ObjectId(id) },
    { $set: { name, ingredients, preparation } });
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
};
