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

const createUser = async (name, email, password) => {
  const connection = await mongoConnection();
  const role = 'user';
  const result = await connection.collection('users').insertOne({ name, email, password, role });

  return { user: { name, email, role, id: result.insertedId } };
};

const loginUser = async (email, password) => {
  const connection = await mongoConnection();

  const loggedin = await connection.collection('users').findOne({ email, password });

  return loggedin;
};

module.exports = {
  getAllUsers,
  getByEmail,
  createUser,
  loginUser,
};
