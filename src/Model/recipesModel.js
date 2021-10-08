const { ObjectId } = require('bson');
const connect = require('./connection');

const createRecipe = async (userId, name, ingredients, preparation) => {
  const db = await connect();
  const recipe = await db.collection('recipes')
  .insertOne({ name, ingredients, preparation });
  return { _id: recipe.insertedId, name, ingredients, preparation, userId };
};

const getAllRecipe = async () => {
  const db = await connect();
  const recipes = await db.collection('recipes').find({}).toArray();
  return recipes;
};

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connect();
  const recipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return recipe;
};

const update = async (recipeDetails) => {
  const { id, name, ingredients, preparation, userId } = recipeDetails;
  if (!ObjectId.isValid(id)) return null;
  const db = await connect();
  await db.collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } });
  return { _id: id, name, ingredients, preparation, userId };
};

const remove = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connect();
  const findRecipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  if (!findRecipe) return ({ status: 404 });
  await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
  return ({ findRecipe });
};

const updateImage = async (id, imagePath, userId) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connect();
  const findRecipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  const { name, ingredients, preparation } = findRecipe;
  await db.collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: { imagePath } });
  return { _id: id, name, ingredients, preparation, userId, image: imagePath };
};

const getImage = async (id, imagePath) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connect();
  const findRecipe = await db.collection('recipes')
  .findOneAndUpdate({ _id: ObjectId(id) }, { $set: { image: imagePath } });
  return findRecipe.value;
};

module.exports = {
  createRecipe,
  getAllRecipe,
  getRecipeById,
  update,
  remove,
  updateImage,
  getImage,
};

// ref: https://github.com/tryber/sd-010-a-cookmaster/pull/25/commits/2e4bcc8dd9fedeb3b001e6860bddecdcb998980b