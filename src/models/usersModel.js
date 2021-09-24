const connection = require('./connection');

const generalDB = async () => {
  const data = await connection().then((db) => db.collection('users'));
  return data;
};

const addUser = async (userData) => {
  const { name, email, password, role } = userData;
  const data = await generalDB();
  
  const alreadyExists = await data.find({ email }).toArray();

  if (alreadyExists.length === 0) {
    return data.insertOne({ name, email, password, role })
      .then((result) => ({
        name,
        email,
        role: role || 'user',
        _id: result.insertedId,
      }));
  }

  throw new Error('Email already registered');
};

const getUser = async (email, password) => {
  const data = await generalDB();

  const findUser = await data.find({ email, password }).toArray();
  return findUser;
};

const getUserByEmail = async (email) => {
  const data = await generalDB();

  const findUser = await data.findOne({ email });

  return findUser;
};

module.exports = {
  addUser,
  getUser,
  getUserByEmail,
};
