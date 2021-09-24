const { ObjectId } = require('mongodb');
const getConnection = require('./connection');

const createRecipes = async (name, ingredients, preparation, _id) => 
  getConnection()
  .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation }))
  .then((result) => ({ name, ingredients, preparation, userId: _id, _id: result.insertedId }))
  .then((recipe) => ({ recipe }));

const findRecipes = async () => {
  const db = await getConnection();
  const recipes = await db.collection('recipes').find({}).toArray();
  if (!recipes) return null;
    return recipes; 
  };

const findRecipesById = async (id) => {
  const idSize = 24;
  if (id.length < idSize) return null;

  const db = await getConnection();
  const ResultFind = await db.collection('recipes').find({ _id: ObjectId(id) }).toArray();
  if (!ResultFind) return null;
    const recipe = ResultFind[0];
    return recipe;
  };

module.exports = { createRecipes, findRecipes, findRecipesById };