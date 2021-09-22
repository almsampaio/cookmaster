const usersService = require('../services/usersService');

const createUSers = async (req, res) => {
  const create = await usersService.createUSers(req.body);
  if (create.message) return res.status(create.code).json({ message: create.message });
  const { password: _, ...createInf } = create.user;
  res.status(201).json({ user: createInf });
};

module.exports = { createUSers };
