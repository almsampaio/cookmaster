const { ObjectId } = require('bson');
const connection = require('./connection');
const usersModels = require('./usersModels');

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

const updateRecipe = async (id, update, role, _id) => {
  if (!ObjectId.isValid(id)) return null;
  const { name, ingredients, preparation } = update;
  const dataUser = await usersModels.searchUserByID(_id);
    
  if (dataUser.role === role || role === 'admin') {
    const db = await connection();
    await db.collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } });
    return { _id, name, ingredients, preparation, userId: _id };
  }
};

module.exports = {
  createRecepie,
  showRecipes,
  showRecipesByID,
  updateRecipe,
};
