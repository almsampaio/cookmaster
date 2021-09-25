const { ObjectId } = require('bson');
const connection = require('./connection');

const createRecipeM = async ({ name, ingredients, preparation, userId }) => {
  const createdRecipe = await connection().then((db) => db
    .collection('recipes').insertOne({ name, ingredients, preparation, userId }))
    .then(({ ops }) => ops[0]).catch((err) => console.log(err));
  return createdRecipe;
};

const getAllRecipesM = async () => {
  const recipesFound = await connection().then((db) => db
    .collection('recipes').find({}).toArray())
    .then((res) => res).catch((err) => console.log(err));
  return recipesFound;
};

const findRecipeByIdM = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const query = { _id: ObjectId(id) };
  const recipeFound = await connection().then((db) => db
    .collection('recipes').findOne(query))
    .then((res) => res).catch((err) => console.log(err));
  return recipeFound;
};

const editRecipeM = async ({ name, ingredients, preparation, id, userId }) => {
  const filter = { _id: id };
  const newRecipe = {
    _id: ObjectId(id),
    name,
    ingredients,
    preparation,
    userId,
  };
  const updateRecipe = {
    $set: newRecipe,
  };
  const result = await connection().then((db) => db
    .collection('recipes').updateOne(filter, updateRecipe))
    .then(() => newRecipe).catch((err) => console.log(err));
  return result;
};

const deleteRecipeM = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const result = await connection().then((db) => db
    .collection('recipes').deleteOne({ _id: new ObjectId(id) }))
    .then((res) => res).catch((err) => console.log(err));
  return result;
};

module.exports = {
  createRecipeM,
  getAllRecipesM,
  findRecipeByIdM,
  editRecipeM,
  deleteRecipeM,
};