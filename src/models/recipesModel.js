const { ObjectId } = require('mongodb');
const connection = require('./connection');

const collectionName = 'recipes';

async function register(recipe) {
  const db = await connection();
  const { insertedId } = await db.collection(collectionName).insertOne(recipe);

  return insertedId;
}

async function getAll() {
  const db = await connection();
  const recipes = await db.collection(collectionName).find().toArray();

  return recipes;
}

async function getById(id) {
  const db = await connection();
  const recipe = await db.collection(collectionName).findOne(new ObjectId(id));

  return recipe;
}

async function update(id, recipe) {
  const db = await connection();
  await db.collection(collectionName).updateOne({ _id: ObjectId(id) }, {
    $set: { ...recipe },
  });
  const updatedRecipe = await getById(id);
  
  return updatedRecipe;
}

async function deleteRecipe(id) {
  const db = await connection();
  await db.collection(collectionName).deleteOne({ _id: ObjectId(id) });
}

module.exports = {
  register,
  getAll,
  getById,
  update,
  deleteRecipe,
};
