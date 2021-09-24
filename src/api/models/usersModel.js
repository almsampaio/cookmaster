const connection = require('./connection');

const findOnebyEmail = async (email) => {
  const db = await connection();
  const result = await db.collection('users').findOne({ email });
  
  return result;
  };

const createUser = async (name, email, password) => {
  const db = await connection();
  const result = await db.collection('users').insertOne({
    name,
    email,
    password,
    role: 'user',
  });

  const { password: _, ...user } = result.ops[0];
  return {
    user,
  };
};

const createAdmin = async (name, email, password) => {
  const db = await connection();
  const result = await db.collection('users').insertOne({
    name,
    email,
    password,
    role: 'admin',
  });

  const { password: _, ...user } = result.ops[0];
  return {
    user,
  };
};

module.exports = {
  createUser,
  createAdmin,
  findOnebyEmail,
};
