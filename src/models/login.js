const getConnection = require('./connections');

const COLLECTION_USERS = 'users';

const searchEmailUser = async (email) => {
  const connectBd = await getConnection();
  const userFound = await connectBd.collection(COLLECTION_USERS)
    .findOne({ email });
  return userFound;
};

module.exports = {
  searchEmailUser,
};
