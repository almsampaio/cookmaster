const usersModel = require('../models/users');

async function create(name, email, password) {
  const user = await usersModel.create(name, email, password);
  return user;
}
module.exports = {
  create,
};