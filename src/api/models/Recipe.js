const { ObjectId } = require('mongodb');
const connection = require('./connection');

const COLLECTION = 'recipes';

exports.create = async ({ name, ingredients, preparation, userId }) => {
  const db = await connection();

  const recipe = await db.collection(COLLECTION)
    .insertOne({ name, ingredients, preparation, userId });

  return {
    _id: recipe.insertedId,
    name,
    ingredients,
    preparation,
    userId,
  };
};

exports.getAll = async () => {
  const db = await connection();

  const recipes = await db.collection(COLLECTION).find().toArray();

  return recipes;
};

exports.getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();

  const recipe = await db.collection(COLLECTION).findOne({ _id: ObjectId(id) });

  return recipe;
};

exports.update = async ({ id, name, ingredients, preparation }) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();

  const { result } = await db
    .collection(COLLECTION)
    .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } });

  if (result.ok) {
      return {
      _id: id,
      name,
      ingredients,
      preparation,
    };
  }

  return null;
};
