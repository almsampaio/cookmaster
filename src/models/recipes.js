const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  const newRecipe = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
  return {
    name,
    ingredients,
    preparation,
    userId,
    _id: newRecipe.insertedId,
  };
};

const getAllRecipes = () => connection()
  .then((db) => db.collection('recipes').find().toArray());

const getRecipeById = async (id) => connection()
  .then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }));

const editRecipe = async (id, name, ingredients, preparation) => {
   await connection()
  .then((db) => db.collection('recipes')
  .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }));
   const recipeId = await getRecipeById(id);
   return recipeId;
};

const deleteRecipe = async (id) => {
  const deleted = await connection()
  .then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }));
  return deleted;
};

const addImageRecipe = async (id, image) => {
  await connection()
    .then((db) => db.collection('recipes').updateOne({ _id: ObjectId(id) }, { $set: { image } }));
  const recipeId = await getRecipeById(id);
  return recipeId;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  editRecipe,
  deleteRecipe,
  addImageRecipe,
};
