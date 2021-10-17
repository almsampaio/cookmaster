const { created } = require('../helpers/http');
const { addUserService } = require('../service/users');

async function create(request, response, next) {
  try {
    const addUser = await addUserService(request.body);
    return created(response, addUser);
  } catch (err) {
    next(err);
  }
}

async function createAdm(request, response, next) {
  try {
    const addUser = await addUserService(request.body, 'admin');
    return created(response, addUser);
  } catch (err) {
    next(err);
  }
}

module.exports = { create, createAdm };