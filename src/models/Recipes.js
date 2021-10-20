const { ObjectId } = require('mongodb');
const connection = require('./connection');

const COLLECTION_NAME = 'recipes';

const getAll = async () => {
  const recipes = await connection.getConnection()
    .then((db) => db.collection(COLLECTION_NAME).find().toArray())
    .then((data) => data)
    .catch((err) => {
      console.error(err);
    });

  return recipes;
};

const getById = async (id) => {
  try {
    const recipe = await connection.getConnection()
    .then((db) => db.collection(COLLECTION_NAME).findOne(ObjectId(id)));

    if (!recipe) return null;

    return recipe;
  } catch (err) {
    return null;
  }
};

const create = async ({ name, ingredients, preparation, userId }) => {
  const { ops } = await connection.getConnection()
    .then((db) => db
      .collection(COLLECTION_NAME)
      .insertOne({ name, ingredients, preparation, userId }));
  
  const { _id } = ops[0];

  return {
    recipe: {
      name,
      ingredients,
      preparation,
      userId,
      _id,
    },
  };
};

const update = async ({ id, name, ingredients, preparation, userId }) => {
  await connection.getConnection()
  .then((db) => db.collection(COLLECTION_NAME)
  .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation, userId } }));

  const recipe = await getById(id);

  return recipe;
};

const deleteById = async (id) => {
  try {
    const response = await connection.getConnection()
    .then((db) => db.collection(COLLECTION_NAME).findOneAndDelete({ _id: ObjectId(id) }));

    if (!response.value) {
      return null;
    }

    return response.value;
  } catch (err) {
    return null;
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
};
