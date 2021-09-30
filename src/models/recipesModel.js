const { ObjectID } = require('bson');
const userModel = require('./userModel');

const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation, userID) => {
  const db = await connection();

 const createNewRecipe = await db.collection('recipes')
 .insertOne({ name, ingredients, preparation, userID });

  return { recipe: createNewRecipe.ops[0] };
};
const getRecipes = async () => {
  const recipes = await connection().then((db) =>
    db.collection('recipes').find({}).toArray());
  // console.log(recipes);
  return recipes;
};

const getRecipeById = async (id) => {
  if (!ObjectID.isValid(id)) return null;
  const db = await connection();
  const recipe = await db.collection('recipes').findOne({ _id: ObjectID(id) });
  return recipe;
};

const updateRecipe = async (id, update, role, _id) => {
  if (!ObjectID.isValid(id)) return null;
  const { name, ingredients, preparation } = update;
  const dataUser = await userModel.getUserByID(_id);
    
  if (dataUser.role === role || role === 'admin') {
    const db = await connection();
    await db.collection('recipes')
    .updateOne({ _id: ObjectID(id) }, { $set: { name, ingredients, preparation } });
    return { _id, name, ingredients, preparation, userId: _id };
  }
};
module.exports = {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
};