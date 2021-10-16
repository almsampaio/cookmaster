const { created } = require('../helpers/http');
const { addUserService } = require('../service/users');

async function create(request, response, next) {
  try {
    const createProduct = await addUserService(request.body);
    return created(response, createProduct);
  } catch (err) {
    next(err);
  }
}

module.exports = { create };