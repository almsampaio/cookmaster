const usersService = require('../services/usersService');

async function createUser(req, res) {
  const { name, email, password } = req.body;
  const createNewUser = await usersService.createUser(name, email, password);

  if (createNewUser.error) {
    return res.status(createNewUser.error.status)
      .json({ message: createNewUser.error.message });
  }

  return res.status(201).json(createNewUser.ops[0]);
}

module.exports = {
  createUser,
};