const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = (name, ingredients, preparation) => connection()
  .then((db) => db.collection('recipes').insertOne({
    name,
    ingredients,
    preparation,
  }))
  .then((result) => result.ops[0])
  .catch((e) => console.log(e));

const getAllRecipes = () => connection()
  .then((db) => db.collection('recipes').find().toArray());

const getById = (id) => connection()
.then((db) => db.collection('recipes').find({ _id: new ObjectId(id) }).toArray());

module.exports = {
  createRecipe,
  getAllRecipes,
  getById,
};
