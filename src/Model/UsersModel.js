const connection = require('./connection');

const registration = async (data) => {
  const dataUser = {
    name: data.name,
    email: data.email,
    password: data.password,
    role: 'user',
  };
  return connection().then((db) => db.collection('users').insertOne(dataUser))
    .then((user) => ({
      user: {
        _id: user.insertedId,
        name: dataUser.name,
        email: dataUser.email,
        role: dataUser.role,
      },
    }))
    .catch((e) => e.message);
};

const searchByEmail = async (email) => connection()
  .then((db) => db.collection('users').findOne({ email }))
  .then((data) => data);

module.exports = {
  registration,
  searchByEmail,
};
