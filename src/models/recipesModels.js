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
  const response = await db.collection('recipes').find().toArray();
  return response;
};

const getRecipesId = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const response = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return response;
};

const editRecipesId = async (id, name, ingredients, preparation) => {
  const db = await connection();
  const response = await db.collection('recipes').findOneAndUpdate(
    { _id: ObjectId(id) }, 
    { $set: { name, ingredients, preparation } },
    { returnOriginal: false },
    );
  return response.value;
};

const deleteRecipesId = async (id) => {
  const db = await connection();
  await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
};

const addRecipesImageId = async (id, path) => {
  const db = await connection();
  const response = await db.collection('recipes').findOneAndUpdate(
    { _id: ObjectId(id) }, 
    { $set: { image: path } },
    { returnOriginal: false },
    );
  return response.value;
  };

module.exports = {
  addRecipes,
  getRecipes,
  getRecipesId,
  editRecipesId,
  deleteRecipesId,
  addRecipesImageId,
};
