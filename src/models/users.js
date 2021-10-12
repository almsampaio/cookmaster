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

module.exports = {
  create,
};
