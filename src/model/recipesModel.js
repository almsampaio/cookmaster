const { ObjectId } = require('mongodb');
const connection = require('../connections/connection');

const registerRecipe = async (newRecipe) => connection()
    .then((db) => db.collection('recipes').insertOne(newRecipe)).then(({ ops }) => ops[0]);

const findRecipes = async () => connection()
  .then((db) => db.collection('recipes').find().toArray());

const findRecipeById = async (id) => connection()
  .then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }));

const updateRecipe = async (id, { name, ingredients, preparation }) => connection()
  .then((db) => db.collection('recipes').findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: { name, ingredients, preparation } },
    { returnOriginal: false },
    )).then((result) => result.value);

const deleteOne = async (id) => connection()
  .then((db) => db.collection('recipes').findOneAndDelete({ _id: ObjectId(id) }));

const updateImage = async (id, image) => connection()
.then((db) => db.collection('recipes').findOneAndUpdate(
  { _id: ObjectId(id) },
  { $set: { image } },
  { returnOriginal: false },
  )).then((result) => result.value);

module.exports = { 
  registerRecipe,
  findRecipes,
  findRecipeById,
  updateRecipe,
  deleteOne,
  updateImage,
}; 