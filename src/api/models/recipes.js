const { ObjectId } = require('mongodb');

const connection = require('./connect');

const create = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  const insertUsers = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
  const result = { 
    _id: insertUsers.insertedId,
    userId,
    name, 
    ingredients, 
    preparation,
  };

  return result;
};

const read = async () => {
  const db = await connection();
  const result = await db.collection('recipes').find({}).toArray();
  return result;
};

const readById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const db = await connection();
  const result = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return result;
};

const update = async ({ id, name, ingredients, preparation }) => {
  const db = await connection();
  const result = await db.collection('recipes')
    .updateOne(
      { _id: ObjectId(id) },
      {
        $set: {
          name,
          ingredients,
          preparation,
        },
      },
    );
  return result;
};

const imageModel = async (id, image) => {
  const db = await connection();
  await db.collection('recipes')
    .updateOne(
      { _id: ObjectId(id) },
      {
        $set: {
          image,
        },
      },
    );
};

const deleteModel = async (id) => {
  const db = await connection();
  await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  create,
  read,
  readById,
  update,
  imageModel,
  deleteModel,
};