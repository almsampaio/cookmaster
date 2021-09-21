const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

const checkEmail = async (paramEmail) => {
  const db = await mongoConnection.getConnection();
  const result = await db.collection('users').findOne({ email: paramEmail });
  if (!result) return null;
  return {
    error: {
      code: 'alreadyExists',
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
    _id: ObjectId(id),
  } };
};

module.exports = {
  registerUser,
};
