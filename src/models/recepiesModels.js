const { ObjectId } = require('bson');
const connection = require('./connection');

const createRecepie = async (name, ingredients, preparation, userID) => {
  const db = await connection();
  
 const create = await db.collection('recipes')
 .insertOne({ name, ingredients, preparation, userID });

  return { recipe: create.ops[0] };
};

const showRecipes = async () => {
  const db = await connection();

  const recipes = await db.collection('recipes').find({}).toArray();
  return recipes;
};

const showRecipesByID = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const recipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return recipe;
};

module.exports = {
  createRecepie,
  showRecipes,
  showRecipesByID,
};
