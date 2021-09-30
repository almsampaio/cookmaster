const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipes = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  const newRecipe = await db.collection('recipes').insertOne({
    name, ingredients, preparation, userId,
  });
  
  return { recipe: newRecipe.ops[0] };
};

const getRecipes = async () => {
  const db = await connection();
  const recipes = await db.collection('recipes').find().toArray();
  return recipes;
};

const getRecipeByID = async (id) => {
  const db = await connection();
  const recipeByID = await db.collection('recipes').findOne(ObjectId(id));
  return recipeByID;
};

const updateRecipeByID = async (name, ingredients, preparation, recipeID) => {
  const db = await connection();
  await db.collection('recipes').updateOne({ _id: ObjectId(recipeID) },
  { $set: { name, ingredients, preparation } });
  return getRecipeByID(recipeID);
};

const deleteRecipeByID = async (id) => {
  const db = await connection();
  const deletedUser = await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
  return deletedUser;
};

const insertImageInRecipeByID = async (recipeID, path) => {
  const imgURL = `localhost:3000/${path}`;
  const db = await connection();
  await db.collection('recipes').updateOne({ _id: ObjectId(recipeID) },
  { $set: { image: imgURL } });
  const recipeWithImg = await db.collection('recipes').findOne({ _id: ObjectId(recipeID) });
  return recipeWithImg;
};

module.exports = {
  createRecipes,
  getRecipes,
  getRecipeByID,
  updateRecipeByID,
  deleteRecipeByID,
  insertImageInRecipeByID,
};
