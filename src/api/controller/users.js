const rescue = require('express-rescue');
const serviceUsers = require('../service/users');

const addUser = rescue(
  async (req, res) => {
    const { name, password, email } = req.body;
    const value = await serviceUsers.addUser(name, password, email);

    return res.status(201).json({ user: value });
  },
);

module.exports = {
  addUser,
};
