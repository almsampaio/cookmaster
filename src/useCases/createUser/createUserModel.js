const UserCollection = require('../../database/userCollection');

const createUserModel = async (user) => {
  const collection = await UserCollection();
  const { ops: [createdUser] } = await collection.insertOne(user);

  return createdUser;
};

module.exports = createUserModel;
