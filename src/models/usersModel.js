const { ObjectId } = require('mongodb');

const mongoConnection = require('./connection');

const getAllUsers = async () => {
  const connection = await mongoConnection();
  const result = await connection.collection('users').find({}).toArray();

  return result;
};

const getByEmail = async (email) => {
  const connection = await mongoConnection();
  const emailResult = await connection.collection('users').findOne({ email });

  return emailResult;
};

const getByUserId = async (userId) => {
  if (!ObjectId.isValid(userId)) return null;

  const connection = await mongoConnection();
  const userIdResult = await connection.collection('users').findOne({ userId });

  return userIdResult;
};

// const getByUserId2 = async (userId) => {
//   const connection = await mongoConnection();
//   const userIdResult = await connection.collection('users').findOne({ _id: ObjectId(userId) });

//   return userIdResult;
// };

const createUser = async (name, email, password) => {
  const connection = await mongoConnection();
  const role = 'user';
  const result = await connection.collection('users').insertOne({ name, email, password, role });

  return { user: { name, email, role, id: result.insertedId } };
};

const loginUser = async (email) => {
  const connection = await mongoConnection();

  const loggedin = await connection.collection('users').findOne({ email });

  return loggedin;
};

module.exports = {
  getAllUsers,
  getByEmail,
  getByUserId,
  // getByUserId2,
  createUser,
  loginUser,
};
