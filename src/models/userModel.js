const connection = require('./connection');

const coll = 'users';

const existingEmail = async (email) => {
  const exists = await connection()
    .then((db) => db.collection(coll).findOne({ email }));

  if (!exists) return null;

  return exists;
};

const checkLogin = async (email, password) => {
  const exists = await connection()
    .then((db) => db.collection(coll).findOne({ email, password }));

  if (!exists) return null;

  const { password: _, ...userWithoutPassword } = exists;

  console.log(userWithoutPassword);

  return userWithoutPassword;
};

const createUser = async (name, password, email, role) => {
  const newUser = await connection()
    .then((db) => db.collection(coll).insertOne({ name, password, email, role }))
    .then((result) => {
      const { password: _, ...userWithoutPassword } = result.ops[0];
      return { user: userWithoutPassword };
    });

  return newUser;
};

module.exports = {
  existingEmail,
  createUser,
  checkLogin,
};
