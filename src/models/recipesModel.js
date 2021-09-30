const { ObjectId } = require('mongodb');
const getConnection = require('./connection');

const getAll = async () => {
  const db = await getConnection();
  const recipes = await db.collection('recipes').find({}).toArray();
  return recipes;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null; // estou validadno o id
  
  const db = await getConnection();
  const recipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return recipe;
};

const create = async (name, ingredients, preparation, userId) => {
  const db = await getConnection();

  const createRecepie = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });

  return { recipe: { name, ingredients, preparation, userId, _id: createRecepie.insertedId } };
};

const update = async (id, upadaterecipe, userId) => {
  if (!ObjectId.isValid(id)) return null;
  const { name, ingredients, preparation } = upadaterecipe;

  const db = await getConnection();
  const updateRecipe = await db.collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } });
    console.log(updateRecipe);
  
    return { _id: updateRecipe.insertedId, name, ingredients, preparation, userId };
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};