const usersService = require('../services/users');

module.exports = {
  async create(req, res) {
    try {
      const userCreated = await usersService.create(req.body);
      return res.status(201).json({ user: userCreated });
    } catch (error) {
      return res.status(error.code).json({ message: error.message });
    }
  },
};
