const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = (name, ingredients, preparation, userId) => connection()
  .then((db) => db.collection('recipes').insertOne({
    name,
    ingredients,
    preparation,
    userId,
  }))
  .then((result) => result.ops[0])
  .catch((e) => console.log(e));

const getAllRecipes = () => connection()
  .then((db) => db.collection('recipes').find().toArray());

const getById = (id) => connection()
.then((db) => db.collection('recipes').find({ _id: new ObjectId(id) }).toArray());

const updateRecipe = (name, ingredients, preparation, id) => connection()
.then((db) => db.collection('recipes').updateOne(
  { _id: ObjectId(id) }, { $set: { name, ingredients, preparation } },
));

module.exports = {
  createRecipe,
  getAllRecipes,
  getById,
  updateRecipe,
};
