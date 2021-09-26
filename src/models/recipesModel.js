const { ObjectId } = require('mongodb');
const connect = require('./connection');

const addRecipe = async (dataToken, name, ingredients, preparation) => {
  const db = await connect();
  const { _id } = dataToken;
  const result = await db.collection('recipes').insertOne({
    name,
    ingredients,
    preparation,
    userId: _id,
  });
  return { recipe: result.ops[0] };
};

const getAllRecipes = async () => {
  const db = await connect();
  const allRecipes = await db.collection('recipes').find({}).toArray();
  return allRecipes;
};

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connect();
  const recipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return recipe;
};

const editRecipe = async (id, name, ingredients, preparation) => {
  const db = await connect();
  const result = await db.collection('recipes').findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: { name, ingredients, preparation } },
    { returnOriginal: false },
  );
  return result.value;
};

const deleteRecipe = async (id) => {
  const db = await connect();
  await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
};

const addRecipeImage = async (id, path) => {
  const db = await connect();
  const result = await db.collection('recipes').findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: { image: path } },
    { returnOriginal: false },
  );
  return result.value;
};

module.exports = {
  addRecipe, 
  getAllRecipes,
  getRecipeById,
  editRecipe,
  deleteRecipe,
  addRecipeImage,
};
