const mongoConnection = require('./connection');

const checkEmail = async (email) => {
  const db = await mongoConnection.getConnection();
  const result = await db.collection('users').findOne({ email });
  if (!result) return null;
  return {
    error: {
      code: 'conflict',
      message: 'Email already registered',
    },
  };
};

const registerUser = async (name, email, password) => {
  const emailExists = await checkEmail(email);
  if (emailExists) return emailExists;

  const db = await mongoConnection.getConnection();
  const { insertedId: id } = await db.collection('users')
    .insertOne({ name, email, password, role: 'user' });

  return { user: {
    name,
    email, 
    role: 'user',
    id,
  } };
};

const login = async (email, password) => {
  const db = await mongoConnection.getConnection();
  const user = await db.collection('users').findOne({ email, password });
  if (!user) return null;
  return user;
};

module.exports = {
  registerUser,
  login,
};
