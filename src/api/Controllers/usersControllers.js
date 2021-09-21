const usersServices = require('../Services/usersServices');

const addUsers = async (req, res) => {
  const { name, email, password } = req.body;

  const { code, message, user } = await usersServices.addUsers(name, email, password);

  return res.status(code).json({ message, ...user });
};

module.exports = {
  addUsers,
};