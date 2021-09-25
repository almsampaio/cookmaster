const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipes = async (name, ingredients, preparation, userId) => connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }))
    .then((result) => result.ops[0]);

const getAll = async () => connection()
    .then((db) => db.collection('recipes').find().toArray());

const getRecipe = async (id) => connection()
    .then((db) => db.collection('recipes').findOne(ObjectId(id)));

const editRecipe = async (id, body) => connection()
    .then((db) => db.collection('recipes')
    .findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: { ...body } }, 
      { returnOriginal: false },
    ))
  .then((result) => result.value);

const deleteRecipe = async (id) => connection()
  .then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }));

const addImage = async (id, image) => connection()
    .then((db) => db.collection('recipes')
    .findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: { image } }, 
      { returnOriginal: false },
))
.then((result) => result.value);

module.exports = {
  createRecipes,
  getAll,
  getRecipe,
  editRecipe,
  addImage,
  deleteRecipe,
};
