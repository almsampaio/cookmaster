// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllRecipes = async () => {
  const db = await connection();
  const recipes = await db.collection('recipes').find({}).toArray();

  return recipes;
};

const addURecipes = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  const recipe = await db.collection('recipes').insertOne(
    { name, ingredients, preparation, userId },
  );
  return {
    recipe:
      { name, ingredients, preparation, userId, _id: recipe.insertedId },
  };
};

module.exports = {
  getAllRecipes,
  addURecipes,

};