const getConnection = require('./connections');

const create = async (name, email, password) => {
  const connectBd = await getConnection();
  const { ops: newUser } = await connectBd.collection('users')
    .insertOne({
      name,
      email,
      password,
      role: 'user',
    });
  
  return newUser;
};

const getAll = async () => {
  const connectBd = await getConnection();
  const allUsers = await connectBd.collection('users').find({}).toArray();
  return allUsers;
};

module.exports = {
  create,
  getAll,
};
