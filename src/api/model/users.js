const { ObjectId } = require('mongodb');
const connection = require('./connection');

const addUser = async (name, password, email, role) => {
  await connection()
    .then((db) => db.collection('users').insertOne({ name, password, email, role }));
  return { name, email, role };
};

const findEmail = async (email) => {
  const value = await connection()
    .then((db) => db.collection('users').findOne({ email }));
  return value;
};

const findUser = async (email, password) => {
  const value = await connection()
    .then((db) => db.collection('users').findOne({ $and: [{ email }, { password }] }));
  return value;
};

const addRecipes = async (recipe) => {
  const value = await connection()
    .then((db) => db.collection('recipes').insertOne(recipe));
  return value.ops[0];
};

const getRecipes = async () => {
  const value = await connection()
    .then((db) => db.collection('recipes').find({ }).toArray());
  return value;
};

const getRecipe = async (id) => {
  const value = await connection()
    .then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }));
  return value;
};

const updateRecipe = async (id, newRecipe) => {
  const { name, ingredients, preparation } = newRecipe;
  await connection()
    .then((db) => db.collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }));
};

const deleteRecipe = async (id) => {
  await connection()
    .then((db) => db.collection('recipes')
    .deleteOne({ _id: ObjectId(id) }));
};

const addImage = async (id, image) => {
  await connection()
    .then((db) => db.collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: { image } }));
};

module.exports = {
  addUser,
  findEmail,
  findUser,
  addRecipes,
  getRecipes,
  getRecipe,
  updateRecipe,
  deleteRecipe,
  addImage,
};
