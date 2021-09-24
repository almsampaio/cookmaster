const UserCollection = require('../../database/userCollection');

const findByEmailModel = async (email) => {
  const collection = await UserCollection();
  const [findedUser] = await collection.find({ email }).toArray();

  return findedUser;
};

module.exports = findByEmailModel;
