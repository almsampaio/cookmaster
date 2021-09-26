const { ObjectId } = require('mongodb');
const connectDB = require('./connectDB');

const createRecipes = async (name, ingredients, preparation, userId) => {
  const conect = await connectDB();
  
  const { ops: newRecipe } = await conect.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });

  // console.log(newRecipe);
  return newRecipe;
};

const getAllRecipes = async () => {
  const conect = await connectDB();

  const recipes = await conect.collection('recipes').find({}).toArray();

  return recipes;
};

const getByIdRecipe = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const conect = await connectDB();
  // const recipe = await conect.collection('recipes').findOne({ _id: id });
  const recipe = await conect.collection('recipes').findOne({ _id: ObjectId(id) });
  
  if (!recipe) return null;

  return recipe;
};

const updateRecipe = async (id, dataBody, userId) => {
  const { name, ingredients, preparation } = dataBody;
  if (!ObjectId.isValid(id)) return null;

  const recipeUpdate = await connectDB();

  await recipeUpdate.collection('recipes')
    .findOneAndUpdate({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation, userId } });

  // console.log('testeModel', value);

  // return { ...value };
  return { _id: id, name, ingredients, preparation, userId };
};

module.exports = {
  createRecipes,
  getAllRecipes,
  getByIdRecipe,
  updateRecipe,
};