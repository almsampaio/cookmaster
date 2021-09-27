const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (userId, name, ingredients, preparation) => {
  const { insertedId: _id } = await connection()
    .then((db) => db
      .collection('recipes')
      .insertOne({ name, ingredients, preparation, userId }));
  const recipesInFormat = { recipe: { name, ingredients, preparation, userId, _id } };
  return recipesInFormat;
};

const getAll = async () => {
  const recipes = await connection()
    .then((db) => db.collection('recipes').find().toArray());
  return recipes;
};

const getOne = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const recipe = await connection()
    .then((db) => db.collection('recipes').findOne(ObjectId(id)));
  return recipe;
};

const update = async (id, name, ingredients, preparation) => {
  await connection()
    .then((db) => db
      .collection('recipes')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }));
  const recipeUpdated = getOne(id);
  return recipeUpdated;
};

const exclude = async (id) => {
  const deleteRecipe = await connection()
    .then((db) => db
      .collection('recipes')
      .deleteOne({ _id: ObjectId(id) }));
  return deleteRecipe;
};

const putWithImage = async (id, image) => {
  await connection()
    .then((db) => db
      .collection('recipes')
      .updateOne({ _id: ObjectId(id) }, { $set: { image } }));
  const recipeWithImage = getOne(id);
  return recipeWithImage;
};

module.exports = {
  create,
  getAll,
  getOne,
  update,
  exclude,
  putWithImage,
};
