const { ObjectID } = require('bson');
const connection = require('./connection');

const getAll = async () => {
  const recipes = await connection().then((db) => db
  .collection('recipes').find({}).toArray()).then((res) => {
    console.log(res, 'getAll recipes Model');
    return res;
  }).catch((err) => console.log(err));

  return recipes;
};

const getById = async (id) => {
  if (!ObjectID.isValid(id)) {
    return null;
  }

  const recipe = await connection().then((db) => db
  .collection('recipes').findOne({ _id: ObjectID(id) }))
  .then((res) => {
    console.log(res, 'getById recipes Model');
    return res;
  }).catch((err) => console.log(err));
  return recipe;
};

const create = async (name, ingredients, preparation, userId) => {
  const newRecipe = await connection().then((db) => db
  .collection('recipes').insertOne({ name, ingredients, preparation, userId }))
  .then((res) => {
    console.log(res, 'create recipe Model');
    return res.ops[0];
  }).catch((err) => console.log(err));

  return newRecipe;
};

const findRecipeByUserId = async (userId) => {
  const soughtRecipe = await connection().then((db) => db
  .collection('recipes').findOne({ userId })).then((res) => res)
  .catch((err) => console.log(err));

  return soughtRecipe;
};

const update = async (id, { name, ingredients, preparation }, userId) => {
  if (!ObjectID.isValid(id)) {
    return null;
  }

  const editRecipe = await connection().then((db) => db
  .collection('recipes').updateOne({ _id: new ObjectID(id) },
  { $set: { name, ingredients, preparation } })).then(() => (
  { _id: id, userId, name, preparation, ingredients }));

  return editRecipe;
};

const exclude = async (id) => {
  if (!ObjectID.isValid(id)) {
    return null;
  }

  const removeRecipe = await connection()
  .then((db) => db.collection('recipes').deleteOne({ _id: ObjectID(id) }));

  return removeRecipe;
};

const addImage = async (image, id) => {
  if (!ObjectID.isValid(id)) {
    return null;
  }

  const { userId, name, preparation, ingredients } = await getById(id);

  const editRecipe = await connection().then((db) => db
  .collection('recipes').updateOne({ _id: new ObjectID(id) }, {
    $set: { image },
  })).then(() => (
    { _id: id, image: `localhost:3000/${image}`, userId, name, preparation, ingredients }
  ));

  return editRecipe;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  findRecipeByUserId,
  exclude,
  addImage,
};
