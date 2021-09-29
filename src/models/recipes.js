const { ObjectId } = require('mongodb');

const connectionRecipes = require('./connection');

const createRecipe = (name, ingredients, preparation, userId) => connectionRecipes()
  .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }));

const getRecipes = () => connectionRecipes()
  .then((db) => db.collection('recipes').find({}).toArray());

const getRecipesById = (id) => connectionRecipes()
  .then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }));

const updateRecipe = (id, name, ingredients, preparation) => connectionRecipes()
  .then((db) => db
    .collection('recipes')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }));

const addRecipeImage = (id, path, userId) => connectionRecipes()
  .then((db) => db.collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: { userId: userId.id, image: path } }));

const removeRecipe = (id) => connectionRecipes()
  .then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }));

module.exports = {
  createRecipe,
  getRecipes,
  getRecipesById,
  updateRecipe,
  removeRecipe,
  addRecipeImage,
};
