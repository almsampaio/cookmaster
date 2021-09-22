const usersService = require('../services/usersService');

async function createUser(req, res) {
  const { name, email, password } = req.body;
  const createNewUser = await usersService.createUser(name, email, password);

  if (createNewUser.error) {
    return res.status(createNewUser.error.status)
      .json({ message: createNewUser.error.message });
  }
  console.log({ user: createNewUser });
  return res.status(201).json(createNewUser);
}

module.exports = {
  createUser,
};