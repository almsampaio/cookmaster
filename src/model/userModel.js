const { ObjectID } = require('mongodb');
const connect = require('./connection');

const addUser = async (name, email, password) => {
  const db = await connect();
  const user = await db.collection('users').insertOne({ name, email, password, role: 'user' });

  return { _id: user.insertedId, name, email, password, role: 'user' };
};

const findAll = async () => {
  const db = await connect();
  const users = await db.collection('users').find().toArray();

  return users;
};

const findByEmail = async (email) => {
  const db = await connect();
  const user = await db.collection('users').findOne({ email });
  return user;
};

const addRecipe = async (name, ingredients, preparation, userId) => {
  const db = await connect();
  const user = await db.collection('recipes').insertOne({ name, ingredients, preparation, userId });

  return { _id: user.insertedId, name, ingredients, preparation, userId };
};

const findAllRecipes = async () => {
  const db = await connect();
  const users = await db.collection('recipes').find().toArray();

  return users;
};

const findByIdRecipes = async (id) => {
  const db = await connect();
  if (!ObjectID.isValid(id)) return false;
  const result = await db.collection('recipes').findOne({ _id: ObjectID(id) });
  return result;
};

module.exports = {
  addUser,
  findAll,
  findByEmail,
  addRecipe,
  findAllRecipes,
  findByIdRecipes,
};
