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

module.exports = { createRecipes, findRecipes };