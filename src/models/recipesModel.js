const { ObjectId } = require('mongodb');

const connection = require('./connection');

const collectionName = 'recipes';

const getAll = async () => {
  const recipes = await connection()
    .then((db) => db.collection(collectionName).find().toArray())
    .catch((err) => console.log(err));
  return recipes;
};

const findById = async (id) => {
  const recipe = await connection()
    .then((db) => db.collection(collectionName).findOne({ _id: { $eq: ObjectId(id) } }))
    .catch((err) => console.log(err));
  return recipe;
};

const findByName = async (nameProduct) => {
  const resultSearch = await connection()
    .then((db) => db.collection(collectionName).findOne({ name: { $eq: nameProduct } }));
  return resultSearch;
};

const deleteById = async (id) => {
  await connection()
    .then((db) => db.collection(collectionName).deleteOne({ _id: { $eq: ObjectId(id) } }))
    .catch((err) => console.log(err));
};

const create = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  const productCreated = await db.collection(collectionName)
    .insertOne({ name, ingredients, preparation, userId })
    .then((result) => ({ _id: result.insertedId, name, ingredients, preparation, userId }))
    .catch((err) => console.log(err));
  return productCreated;
};

const update = async (recipeInfo) => {
  const { id, name, ingredients, preparation } = recipeInfo;
  await connection()
    .then((db) => db.collection(collectionName)
      .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }))
    .catch((err) => console.log(err));
};

const registerImage = async (id, imagePath) => {
  await connection()
  .then((db) => db.collection(collectionName)
    .updateOne({ _id: ObjectId(id) }, { $set: { image: imagePath } }))
  .catch((err) => console.log(err));
};

module.exports = { getAll, findById, deleteById, create, update, findByName, registerImage }; 