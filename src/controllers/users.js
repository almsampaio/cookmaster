const { created } = require('../helpers/http');
const { addUserService } = require('../service/users');

async function create(request, response) {
  try {
    const createProduct = await addUserService(request.body);
    return created(response, createProduct);
  } catch (error) {
    return response.status(409).json({ message: error.message });
  }
}

module.exports = { create };