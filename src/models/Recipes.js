const { ObjectId } = require('mongodb');
const connection = require('./Connection');

const addRecipe = async (name, ingredients, preparation, userID) => {
  const db = await connection();
  const userCreated = await db
    .collection('users').insertOne({ name, ingredients, preparation, userId: ObjectId(userID.id) });
  return userCreated.ops[0];
};

const findRecipe = async () => {
  const db = await connection();
  const userData = await db.collection('users').findOne({ });
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
