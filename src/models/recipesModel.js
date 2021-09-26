const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = async (recipe) => {
  const db = await connection();
  const create = db.collection('recipes').insertOne(recipe);
  return { _id: create.insertedId, recipe };
};

const getRecipes = async () => {
  const db = await connection();
  const recipe = db.collection('recipes').find().toArray();
  return recipe;
};

const getRecipeById = async (_id) => {
  if (!ObjectId.isValid(_id)) return null;
  const db = await connection();
  const findId = db.collection('recipes').findOne(ObjectId(_id));
  return findId;
};

const editRecipe = async (_id, name, ingredients, preparation) => {
  const db = await connection();
  db.collection('recipes').updateOne(
    {
      _id: ObjectId(_id) }, 
    { $set: { name, ingredients, preparation } },
  );
  return { _id, name, ingredients, preparation };
};

const deleteRecipe = async (_id) => {
  const db = await connection();
  const deletee = db.collection('recipes').deleteOne(
    {
      _id: ObjectId(_id),
    },
  );
  return deletee;
};

module.exports = { createRecipe, getRecipes, getRecipeById, editRecipe, deleteRecipe };
