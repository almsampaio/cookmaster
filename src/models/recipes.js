const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = async (recipeData) => {
  const db = await connection();

  const { ops } = await db.collection('recipes').insertOne(recipeData);

  return ops[0];
};

const getRecipes = async () => {
  const db = await connection();

  const result = await db.collection('recipes').find({}).toArray();

  return result;
};

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();

  const result = await db.collection('recipes').findOne(ObjectId(id));

  return result;
};

const editRecipeById = async (id, recipeData) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();

  const { value } = await db.collection('recipes').findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: { ...recipeData } },
    { returnOriginal: false },
  );

  return value;
};

const deleteRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();

  const { value } = await db.collection('recipes').findOneAndDelete(
    { _id: ObjectId(id) },
  );

  return value;
};

const insertImage = async (id, image) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();

  const { value } = await db.collection('recipes').findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: { image } },
    { returnOriginal: false },
  );

  return value;
};

module.exports = {
  createRecipe,
  getRecipes,
  getRecipeById,
  editRecipeById,
  deleteRecipeById,
  insertImage,
};
