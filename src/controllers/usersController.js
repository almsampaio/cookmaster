const usersService = require('../services/usersService');

async function createUser(req, res) {
  const { name, email, password } = req.body;
  const createNewUser = await usersService.createUser(name, email, password);

  if (createNewUser.error) {
    return res.status(createNewUser.error.status)
      .json({ message: createNewUser.error.message });
  }
  return res.status(201).json(createNewUser);
}

async function loginUser(req, res) {
  const { email, password } = req.body;
  const user = await usersService.loginUser(email, password);
  if (user.error) {
    return res.status(user.error.status).json({ message: user.error.message });
  }
  return res.status(200).json({ token: user.token });
}

module.exports = {
  createUser,
  loginUser,
};