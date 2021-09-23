const { ObjectId } = require('mongodb');
const connection = require('./connection');

const coll = 'recipes';

const newRecipe = async (name, ingredients, preparation) => {
  const recipe = await connection()
    .then((db) => db.collection(coll).insertOne({ name, ingredients, preparation }))
    .then((result) => result.ops[0]);
  
  return recipe;
};

const getRecipes = async () => {
  const recipes = await connection()
    .then((db) => db.collection(coll).find().toArray());
  
  return recipes;
};

const getRecipe = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const recipe = await connection()
    .then((db) => db.collection(coll).findOne(new ObjectId(id)))
    .then((result) => ({ ...result, userId: new ObjectId() }));

  return recipe;
};

module.exports = {
  newRecipe,
  getRecipes,
  getRecipe,
};
