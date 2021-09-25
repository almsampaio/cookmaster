const { ObjectId, ObjectID } = require('mongodb');
const connection = require('./connection');

const createRecipe = async (newRecipe) => {
  const db = await connection();
  const recipe = await db.collection('recipes').insertOne(newRecipe);
  
  return recipe.ops[0];
};

const getRecipes = async () => {
  const db = await connection();
  const user = await db.collection('recipes').find().toArray();
  // console.log(email);
  
  return user;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const db = await connection();
  const user = await db.collection('recipes').findOne(new ObjectId(id));

  return user;
};

const editRecipe = async (newData) => {
  const { id, ...recipeToUpdate } = newData;
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const db = await connection();

  const edited = await db
    .collection('recipes')
    .findOneAndUpdate({ _id: ObjectID(id) }, { $set: recipeToUpdate });

  if (!edited) return null;
  
  return edited.value;
};

module.exports = {
  createRecipe,
  getRecipes,
  getById,
  editRecipe,
};