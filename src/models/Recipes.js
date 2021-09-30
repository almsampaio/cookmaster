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

module.exports = {
  addRecipe,
  findRecipe,
  allRecipes,
};
