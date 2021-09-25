const errors = require('../errors');
const UserService = require('../services/UserService');

const createUser = async (req, res) => {
  const { name, email, password, role = 'user' } = req.body;

  const userEmail = await UserService.findUserByEmail(email);

  if (userEmail) {
    return res.status(409).json({ message: errors.emailAlreadyRegistered });
  }

  const user = await UserService.createUser({ name, email, password, role });

  res.status(201).json({ user });
};

module.exports = { createUser };
