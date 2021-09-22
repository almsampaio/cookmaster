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
  return (result);
};

const getOne = async (recipeId) => {
  if (!ObjectId.isValid(recipeId)) return null;
  const result = await connection()
    .then((db) => db.collection('recipes').findOne({ _id: ObjectId(recipeId) }));
  return (result);
};

const editOne = async (recipeId, updatedRecipe) => {
  if (!ObjectId.isValid(recipeId)) return null;
  const result = await connection()
    .then((db) => db.collection('recipes').findOneAndUpdate(
      { _id: ObjectId(recipeId) }, { $set: updatedRecipe }, { returnOriginal: false },
    ));
  return (result);
};

const deleteOne = async (recipeId) => {
  if (!ObjectId.isValid(recipeId)) return null;
  const result = await connection()
    .then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(recipeId) }));
  console.log(result);
  return result;
};

module.exports = {
  create,
  getAll,
  getOne,
  editOne,
  deleteOne,
};