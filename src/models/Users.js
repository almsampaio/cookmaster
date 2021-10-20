const { ObjectId } = require('mongodb');
const connection = require('./connection');

const COLLECTION_NAME = 'users';

const getAll = async () => {
  const users = await connection.getConnection()
    .then((db) => db.collection(COLLECTION_NAME).find().toArray())
    .then((data) => data)
    .catch((err) => {
      console.error(err);
    });

  return users;
};

const getById = async (id) => {
  try {
    const user = await connection.getConnection()
    .then((db) => db.collection(COLLECTION_NAME).findOne(ObjectId(id)));

    if (!user) return null;

    return user;
  } catch (err) {
    return null;
  }
};

const create = async ({ name, email, password, role }) => {
  const { ops } = await connection.getConnection()
    .then((db) => db.collection(COLLECTION_NAME).insertOne({ name, email, password, role }));

  const { _id } = ops[0];

  return {
    user: {
      name,
      email,
      role,
      _id,
    },
  };
};

const update = async ({ id, name, email, password, role }) => {
  await connection.getConnection()
  .then((db) => db.collection(COLLECTION_NAME)
  .updateOne({ _id: ObjectId(id) }, { $set: { name, email, password, role } }));

  const user = await getById(id);

  return user;
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
