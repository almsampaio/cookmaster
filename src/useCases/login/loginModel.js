const userCollection = require('../../database/userCollection');

const loginModel = async ({ email, password }) => {
  const collection = await userCollection();
  const [user] = await collection.find({ email, password }).toArray();
  return user;
};

module.exports = loginModel;
