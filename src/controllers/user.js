const rescue = require('express-rescue');

const serviceUser = require('../services/users');

const ok = 201;

const create = rescue(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await serviceUser.create({ name, email, password, role: 'user' });
  res.status(ok).json(user);
});

module.exports = {
  create,
};
