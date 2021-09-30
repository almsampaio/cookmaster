const { ObjectId } = require('mongodb');
const connection = require('./Connection');

const addRecipe = async (name, ingredients, preparation, userID) => {
  const db = await connection();
  const userCreated = await db
    .collection('recipes')
    .insertOne({ name, ingredients, preparation, userId: ObjectId(userID.id) });
  return userCreated.ops[0];
};

const findRecipe = async (id) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return null;
  const userData = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return userData;
};

const allRecipes = async () => {
  const db = await connection();
  const recipes = await db.collection('recipes').find().toArray();
  return recipes;
};

const updateRecipe = async (id, name, ingredients, preparation) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return null;

  await db.collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } });
  const newRecipes = await findRecipe(id);
  return newRecipes;
};

const removeRecipes = async (id) => {
  const db = await connection();
  const recipes = await findRecipe(id);
  if (!recipes) return false;
  await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
  return recipes;
};

const addImageInRecipe = async (id, image) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return null;

  const newRecipes = await db.collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: { image } });

  const newRecipe = await findRecipe(id);
  return newRecipe;
};

module.exports = {
  addRecipe,
  findRecipe,
  allRecipes,
  updateRecipe,
  removeRecipes,
  addImageInRecipe,
};
