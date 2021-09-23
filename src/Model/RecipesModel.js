const { ObjectId } = require('bson');
const connection = require('./connection');

const registration = (id, data) => {
  const newRecipe = {
    name: data.name,
    ingredients: data.ingredients,
    preparation: data.preparation,
    userId: id,
  };
  return connection().then((db) => db.collection('recipes').insertOne(newRecipe))
    .then((recipe) => ({
      recipe: {
        ...newRecipe,
        _id: recipe.insertedId,
      },
    }));
};

const getAllRecipes = () => connection()
  .then((db) => db.collection('recipes').find().toArray())
  .then((recipes) => recipes);

const getById = (id) => connection()
  .then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }))
  .then((recipe) => recipe);

const edition = (data, UserId, id) => {
  const newRecipe = {
    name: data.name,
    ingredients: data.ingredients,
    preparation: data.preparation,
    userId: UserId,
  };
  return connection()
    .then((db) => db.collection('recipes')
      .findOneAndUpdate({ _id: ObjectId(id) }, { $set: newRecipe }, { returnOriginal: false }))
    .then((recipe) => recipe);
};

const deleted = (id) => connection()
  .then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }));
module.exports = { registration, getAllRecipes, getById, edition, deleted };