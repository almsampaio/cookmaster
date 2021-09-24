const ModelUsers = require('../models/ModelUsers');
const invalidData = require('../utils/invalidData');

const CONFLICT = 409;

const create = async ({ name, email, password }) => {
  const findEmail = await ModelUsers.getByEmail({ email });
  
  if (findEmail) throw invalidData('Email already registered', CONFLICT);

  const createdUser = await ModelUsers.create({ name, email, password });

  return createdUser;
};

module.exports = {
  create,
};
