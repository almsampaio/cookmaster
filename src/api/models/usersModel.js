const connection = require('./connection');

const findByEmail = async (email) => {
  const db = await connection();
  const userEmail = await db.collection('users').findOne({ email });
  return userEmail;
};

const createNewUser = async (name, email, password, role) => {
  const db = await connection();
  const newUser = await db.collection('users').insertOne({
    name, email, password, role,
  });
  const removeProp = 'password';
  const { [removeProp]: remove, ...nameEmailRoleAndID } = newUser.ops[0]; // source: https://ultimatecourses.com/blog/remove-object-properties-destructuring
  return { user: nameEmailRoleAndID };
};

const userLogin = async (email, password) => {
  const db = await connection();
  const user = await db.collection('users').findOne({ email, password });
  return user;
};

module.exports = {
  findByEmail,
  createNewUser,
  userLogin,
};
