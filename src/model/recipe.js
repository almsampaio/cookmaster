const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (name, ingredients, preparation, userId) => {
  const result = await connection()
    .then((db) => db.collection('recipes').insertOne({
      name, ingredients, preparation, userId,
    }));
  return ({ recipe: result.ops[0] });
};

const getAll = async () => {
  const result = await connection()
    .then((db) => db.collection('recipes').find({}).toArray());
  console.log(result);
  return (result);
};

const getOne = async (recipeId) => {
  console.log(recipeId);
  if (!ObjectId.isValid(recipeId)) return null;
  const result = await connection()
    .then((db) => db.collection('recipes').findOne({ _id: ObjectId(recipeId) }));
  return (result);
};

module.exports = {
  create,
  getAll,
  getOne,
};