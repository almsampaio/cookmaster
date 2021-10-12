const { addUserService } = require('../service/users');

async function create(request, response) {
  try {
    const createProduct = await addUserService(request.body);
    return response.status(201).json(createProduct);
  } catch (error) {
    return response.status(409).json({ message: error.message });
  }
}

module.exports = { create };