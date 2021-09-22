const userService = require('../services/userService');

async function addUser(req, res) {
  const { name, email, password } = req.body;
  const addedUser = await userService.addUser({ name, email, password });

  if (addedUser.message) {
    return res.status(addedUser.code).json({ message: addedUser.message });
  }
  res.status(addedUser.code).json({ user: addedUser.user });
}

module.exports = {
  addUser,
};
