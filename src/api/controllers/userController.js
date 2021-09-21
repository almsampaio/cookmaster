const userService = require('../service/userService');

module.exports = {
  async create(req, res) {
    const { name, email, password, role } = req.body;

    const newUser = await userService.create(name, email, password, role);

    return res.status(201).json({ user: newUser });
  },
};