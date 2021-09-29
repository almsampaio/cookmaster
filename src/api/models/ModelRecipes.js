const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async ({ name, ingredients, preparation, userId }) => {
  const connect = await connection();

  const createdRecipe = await connect.collection('recipes')
  .insertOne({ name, ingredients, preparation, userId });

  return {
    recipe: {
      _id: createdRecipe.insertedId,
      name,
      ingredients,
      preparation,
      userId,
    },
  };
};

const getAll = async () => {
  const connect = await connection();

  const getAllRecipes = await connect.collection('recipes').find().toArray();

  return getAllRecipes;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const connect = await connection();
  const findRecipe = await connect.collection('recipes').findOne({ _id: ObjectId(id) });

  return findRecipe;
};

const editRecipe = async (id, userId, { name, ingredients, preparation }) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const connect = await connection();
  const editedRecipe = await connect.collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: { userId, name, ingredients, preparation } });

  if (editedRecipe.modifiedCount < 1) {
    return false;
  }

  return {
    _id: id,
    name,
    ingredients,
    preparation,
    userId,
  };
};

module.exports = {
  create,
  getAll,
  getById,
  editRecipe,
};
