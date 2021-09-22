const userModel = require('../models/userModel');

const create = async (user) => {
  const userCreated = await userModel.create(user);
  console.log('service:', userCreated);
  return { status: 201, data: userCreated };
};

module.exports = {
  create,
};
