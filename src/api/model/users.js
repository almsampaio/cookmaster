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

module.exports = {
  addUser,
  findEmail,
  findUser,
  addRecipes,
  getRecipes,
};
