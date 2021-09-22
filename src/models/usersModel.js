const connection = require('./connection');

// const generalDB = async () => {
//   const data = await connection().then((db) => db.collection('users'));
//   return data;
// };

const addUser = async (name, email) => {
  const data = await connection().then((db) => db.collection('users'));
  const role = 'user';
  
  const alreadyExists = await data.find({ email }).toArray();

  if (alreadyExists.length === 0) {
    return data.insertOne({ name, email, role })
      .then((result) => ({
        name,
        email,
        role,
        _id: result.insertedId,
      }));
  }

  throw new Error('Email already registered');
};

module.exports = {
  addUser,
};
