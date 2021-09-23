const { ObjectID } = require('bson');
const connection = require('./connection');

const getAll = async () => {
  const recipes = await connection().then((db) => db
  .collection('recipes').find({}).toArray()).then((res) => {
    console.log(res, 'getAll recipes Model');
    return res;
  }).catch((err) => console.log(err));

  return recipes;
};

const getById = async (id) => {
  if (!ObjectID.isValid(id)) {
    return null;
  }

  const recipe = await connection().then((db) => db
  .collection('recipes').findOne({ _id: ObjectID(id) }))
  .then((res) => {
    console.log(res, 'getById recipes Model');
    return res;
  }).catch((err) => console.log(err));
  return recipe;
};

const create = async (name, ingredients, preparation, userId) => {
  const newRecipe = await connection().then((db) => db
  .collection('recipes').insertOne({ name, ingredients, preparation, userId }))
  .then((res) => {
    console.log(res, 'create recipe Model');
    return res.ops[0];
  }).catch((err) => console.log(err));

  return newRecipe;
};

module.exports = {
  create,
  getAll,
  getById,
};
