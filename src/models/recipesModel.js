const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = async (obj, user) => {
  const { name, ingredients, preparation } = obj;
  const { _id: userId } = user;
  const db = await connection();
  const newRecipe = await db.collection('recipes').insertOne({
    name,
    ingredients,
    preparation,
    userId,
  }).then((res) => ({ _id: res.insertedId, name, ingredients, preparation, userId }));

  return newRecipe;
};

const getAllRecipes = async () => {
  const db = await connection();
  const findAllRecipes = await db.collection('recipes').find().toArray();

  return findAllRecipes;
};

const findRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  const findRecipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });

  return findRecipe;
};

const editRecipe = async (id, obj, user) => {
  if (!ObjectId.isValid(id)) return null;
  const { name, ingredients, preparation } = obj;
  const { _id: userId } = user;

  const db = await connection();
  const setRecipe = await db.collection('recipes')
    .findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: { name, ingredients, preparation } },
      { returnOriginal: false },
    ).then(() => ({ _id: id, name, ingredients, preparation, userId }));

  return setRecipe;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  findRecipeById,
  editRecipe,
};
