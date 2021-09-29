const { ObjectId } = require('mongodb');
const connection = require('./connection');

const addRecipes = async (name, ingredients, preparation, token) => {
  const db = await connection();
  const { _id } = token;
  const response = await db.collection('recipes').insertOne(
    { name, ingredients, preparation, userId: _id },
    );
  return { recipe: response.ops[0] };
};

const getRecipes = async () => {
  const db = await connection();
  const result = await db.collection('recipes').find().toArray();
  return result;
};

const getRecipesId = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const response = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return response;
};

module.exports = {
  addRecipes,
  getRecipes,
  getRecipesId,
};
