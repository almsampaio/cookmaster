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

const upDateRecipes = async (data, userId, id) => {
  const db = await connect();
  const { name, ingredients, preparation } = data;
  await db.collection('recipes')
    .updateOne({ _id: ObjectID(id) }, { $set: { name, ingredients, preparation, userId } });
  const recipe = await findByIdRecipes(id);
  return recipe;
};

const excludeRecipes = async (id) => {
  const db = await connect();
  await db.collection('recipes').deleteOne({ _id: ObjectID(id) });
};

const upLoadFile = async (id, image) => {
  const db = await connect();
  const result = await db.collection('recipes')
    .findOneAndUpdate({ _id: ObjectID(id) }, { $set: { image } });
    console.log(result);
  return { ...result.value, image };
};

module.exports = {
  addUser,
  findAll,
  findByEmail,
  addRecipe,
  findAllRecipes,
  findByIdRecipes,
  upDateRecipes,
  excludeRecipes,
  upLoadFile,
};
